import mermaid from 'mermaid';

export async function validateMermaidCode(code) {
  try {
    await mermaid.parse(code);
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

export function formatMermaidError(error) {
  return `Mermaid Syntax Error: ${error}<br>Please check diagram type and syntax.<br><a href="https://mermaid.live/" target="_blank">Try Mermaid Live Editor</a>`;
}


export function normalizeMermaidCode(code) {
  return code.replace(/\\n/g, '\n');
}
