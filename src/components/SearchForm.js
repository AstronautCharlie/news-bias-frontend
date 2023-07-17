import React, { useState, useEffect } from 'react';
import * as d3 from 'd3'; // Import D3 library
import './SearchForm.css'; // Import the CSS file

const SearchForm = () => {
  const [searchDate, setSearchDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [subjectMatter, setSubjectMatter] = useState('');
  const [embeddings, setEmbeddings] = useState([]);

  useEffect(() => {
    // Call the Flask API to fetch the embeddings when the component mounts
    fetchEmbeddings();
  }, []);

  const fetchEmbeddings = () => {
    // Create the request body object
    const requestBody = {
      searchDate,
      startDate,
      endDate,
      subjectMatter,
    };

    // Send the request to the Flask API
    fetch('http://localhost:5000/article_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        setEmbeddings(data.embeddings);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // Perform t-SNE visualization when the embeddings data changes
    visualizeEmbeddings();
  }, [embeddings]);

  const visualizeEmbeddings = () => {
    // Clear previous visualization
    d3.select('.tsne-visualization').selectAll('*').remove();

    // Create a new D3.js visualization
    const svg = d3
      .select('.tsne-visualization')
      .append('svg')
      .attr('width', 400)
      .attr('height', 400);

    // Perform t-SNE calculations and update the visualization with the embeddings
    // Use the `embeddings` state to access the returned embeddings data

    // Example code to visualize embeddings with D3.js
    // You need to modify this part based on your specific t-SNE implementation
    // This example simply shows circles at random positions as a placeholder
    const randomPositions = Array.from({ length: embeddings.length }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 400,
    }));

    svg
      .selectAll('circle')
      .data(randomPositions)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', 5)
      .attr('fill', 'steelblue');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEmbeddings();
  };

  return (

        <div>
            <h1 className="article-search-header">Article Search</h1>
            <form onSubmit={handleSubmit} className="search-form">
            <label>
                Search Date:
                <input
                type="text"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="rounded-input"
                />
            </label>
            <br />
            <label>
                Start Date:
                <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-input"
                />
            </label>
            <br />
            <label>
                End Date:
                <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-input"
                />
            </label>
            <br />
            <label>
                Subject Matter:
                <input
                type="text"
                value={subjectMatter}
                onChange={(e) => setSubjectMatter(e.target.value)}
                className="rounded-input"
                />
            </label>
            <br />
            <button type="submit" className="rounded-button">Search</button>
            </form>
            <div className="tsne-visualization"></div>
        </div>
  );
}

export default SearchForm;
