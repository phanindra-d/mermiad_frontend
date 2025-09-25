import './MainContent.css'
import React, { useState, useRef, useEffect } from 'react'
import ChatBot from '../ChatBot/ChatBot';
import mermaid from 'mermaid';
import { generateMermaidCode } from '../../services/mermaidService';
import { validateMermaidCode, formatMermaidError, normalizeMermaidCode } from '../../utils/mermaidUtils';


const initialCode = `graph TD
A[Start] --> B{Is it?}
B -- Yes --> C[OK]
C --> D[Rethink]
D --> A;
B -- No --> E[End]`;

const MainContent = () => {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
      const renderDiagram = async () => {
        const cleanCode = normalizeMermaidCode(code);
        const validation = await validateMermaidCode(cleanCode);
        if (validation.valid) {
          mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            themeVariables: {
              fontSize: "24px",
              nodeSpacing: 100,
              rankSpacing: 120
            }
          });
          if (previewRef.current) {
            previewRef.current.innerHTML = '';
            const id = "theGraph-" + Date.now();
            const element = document.createElement("div");
            element.className = "mermaid";
            element.id = id;
            element.textContent = cleanCode;
            previewRef.current.appendChild(element);
            mermaid.run({ nodes: [element] });
          }
        } else {
          displayError(formatMermaidError(validation.error));
        }
      };
      renderDiagram();
  }, [code]);

  
  const handleGenerate = async () => {
    setLoading(true);
    const diagramType = document.getElementById("diagramType").value;
    try {
      const data = await generateMermaidCode({
        description: "",
        diagram_type: diagramType,
        existing_code: code
      });
      console.log("Response from backend:", data);
      let mermaidCode = normalizeMermaidCode(data.mermaid_code);
      console.log(mermaidCode);
      if (
        typeof mermaidCode !== 'string' ||
        mermaidCode.startsWith('Error') ||
        mermaidCode.includes('model is overloaded') ||
        mermaidCode.includes('"error":')
      ) {
        displayError('Backend Error: Could not generate diagram.<br><span style="font-size:0.95em;">'+mermaidCode+'</span>');
        alert("Backend responded with an error! Check console/Swagger.");
        setLoading(false);
        return;
      }
      setCode(mermaidCode);
      const validation = await validateMermaidCode(mermaidCode);
      if (validation.valid) {
        console.log('Mermaid syntax is valid.');
        document.getElementById("code").value = mermaidCode;
      } else {
        displayError(formatMermaidError(validation.error));
      }
      alert("Backend responded! Check console/Swagger.");
    } catch (err) {
      console.error("Error generating diagram:", err);
      displayError('Error: ' + err);
    }
    setLoading(false);
  };

  // Helper function to display errors in the preview area
  function displayError(message) {
    const previewDiv = document.querySelector('.preview');
    if (previewDiv) {
      previewDiv.innerHTML = `
        <div style="color: #d32f2f; font-weight: bold;">
          <span style="font-size:1.4em;">&#9888;</span>
          ${message}
        </div>
      `;
    }
  }

  // validateMermaid is now replaced by validateMermaidCode from utils

  return (
    <div className='main-content'>
      <div className="left-container">
        <h1>Create Stunning Diagrams</h1>
        <p>Simply Write Mermaid Syntax And Watch Your Diagrams</p>
        <h3>Mermaid Syntax</h3>
        <textarea
          id="code"
          rows="7"
          style={{ width: "100%", maxWidth: "600px", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <div className="diagram-type">
          <label><strong>Diagram Type:</strong></label>
          <select id="diagramType">
            <option value="flowchart TD">📊 Flowchart (Top to Bottom)</option>
            <option value="flowchart LR">📊 Flowchart (Left to Right)</option>
            <option value="erDiagram">🗄️ Database Schema (ER Diagram)</option>
            <option value="graph TD">🏗️ System Architecture</option>
            <option value="sequenceDiagram">🔄 Sequence Diagram</option>
            <option value="classDiagram">📐 Class Diagram</option>
          </select>
        </div>
        <button className='generate-btn' onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Diagram"}
        </button>
        <ChatBot setCode={setCode}/>
      </div>
      <div className="right-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '700px', minHeight: '773px' }}>
        <h3>Diagram Preview</h3>
        <div
          className="preview"
          ref={previewRef}
          style={{
            width: '95%',
            height: '800px',
            maxHeight: '800px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            overflow: 'auto',
            margin: '0 auto',
            padding: '2rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        ></div>
      </div>
    </div>
  )
}

export default MainContent
