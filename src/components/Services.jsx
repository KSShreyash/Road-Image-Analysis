import React, { useState } from 'react';

function Services() {
  const [previewSrc, setPreviewSrc] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [resultClass, setResultClass] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const analyzeImageWithImagga = async (base64Image) => {
    const apiKey = 'acc_d32ac1386a7f2a7';
    const apiSecret = '4f8c999abbec197d356f09807929878e';
    const auth = btoa(`${apiKey}:${apiSecret}`);

    const response = await fetch('https://api.imagga.com/v2/tags', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
      },
      body: new URLSearchParams({
        image_base64: base64Image,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.result.tags;
  };

  const analyzeRoadCondition = (tags) => {
    const badRoadKeywords = [
      'pothole', 'crack', 'damage', 'uneven', 'bump',
      'rough', 'broken', 'debris', 'gravel', 'dirt road',
    ];
    const goodRoadKeywords = [
      'smooth', 'paved', 'asphalt', 'concrete', 'highway',
      'road', 'street', 'clean', 'flat', 'modern',
    ];

    let badScore = 0;
    let goodScore = 0;

    tags.forEach((tag) => {
      const tagName = tag.tag.en.toLowerCase();
      const confidence = tag.confidence;

      if (badRoadKeywords.some((keyword) => tagName.includes(keyword))) {
        badScore += confidence;
      } else if (goodRoadKeywords.some((keyword) => tagName.includes(keyword))) {
        goodScore += confidence;
      }
    });

    if (badScore > goodScore) {
      return 'Bad';
    } else if (goodScore > badScore) {
      return 'Good';
    } else {
      return 'Average';
    }
  };

  const showResult = (condition) => {
    let cls = '';
    let icon = '';

    if (condition === 'Good') {
      cls = 'good-result';
      icon = '✅';
    } else if (condition === 'Bad') {
      cls = 'bad-result';
      icon = '⚠️';
    } else {
      cls = 'neutral-result';
      icon = 'ℹ️';
    }

    setResultClass(cls);
    setAnalysisResult(`${icon} Road Condition: ${condition}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewSrc(ev.target.result);
        setAnalysisResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    if (!file) {
      alert('Please upload an image first!');
      return;
    }

    setAnalyzing(true);

    try {
      const base64Image = await toBase64(file);
      const tags = await analyzeImageWithImagga(base64Image);
      const condition = analyzeRoadCondition(tags);
      showResult(condition);
    } catch (error) {
      setResultClass('bad-result');
      setAnalysisResult('Error analyzing image');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section id="services" className="service">
      <div className="service-vertical">
        <div className="vertical-banner">
          <div className="vertical-content">
            <p>🚗 Check Road Conditions!</p>
            <p>🚦 Stay Safe & Plan Your Journey.</p>
            <p>🛣️ Avoid Traffic & Bad Roads.</p>
            <p>📍 Get Real-Time Updates!</p>
            <p>🚗 Check Live Road Conditions!</p>
            <p>🚦 Stay Safe & Plan Your Journey.</p>
          </div>
        </div>
      </div>
      <div className="service-upload">
        <h2>Upload The Image To Analyze</h2>
        <label htmlFor="imageInput" className="upload-label">Select File To Upload</label>
        <input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} />
        <br />
        {previewSrc && <img id="preview" alt="Image Preview" src={previewSrc} />}
        <button
          id="analyzeBtn"
          className="analyze-button"
          onClick={handleAnalyzeClick}
          disabled={analyzing || !previewSrc}
        >
          {analyzing ? 'Analyzing...' : 'Analyze Road'}
        </button>
        <div id="analysisResult" className={resultClass} style={{ display: analysisResult ? 'block' : 'none' }}>
          {analysisResult}
        </div>
      </div>
    </section>
  );
}

export default Services;
