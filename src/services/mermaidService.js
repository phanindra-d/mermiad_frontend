

export async function generateMermaidCode({ description, diagram_type, existing_code }) {
  const response = await fetch('http://127.0.0.1:8000/generate-mermaid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, diagram_type, existing_code })
  });
  if (!response.ok) {
    throw new Error('Backend error: ' + response.statusText);
  }
  return await response.json();
}