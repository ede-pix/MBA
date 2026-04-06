export function parseMarkdown(text: string) {
  if (!text) return '';
  
  // Basic sanitization
  let html = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  html = html
    // Headings
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.25rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; color: var(--text-primary)">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.5rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary)">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: var(--text-primary)">$1</h1>')
    
    // Blockquote (since we sanitized, check for &gt;)
    .replace(/^\&gt; (.*$)/gim, '<blockquote style="border-left: 4px solid var(--accent-primary); padding-left: 1rem; color: var(--text-tertiary); margin: 1rem 0; font-style: italic;">$1</blockquote>')
    
    // Bold & Italic
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    
    // Lists (- item)
    .replace(/^\- (.*$)/gim, '<li style="margin-left: 1.5rem; list-style-type: disc; margin-bottom: 0.25rem;">$1</li>')
    // Lists (1. item)
    .replace(/^\d+\. (.*$)/gim, '<li style="margin-left: 1.5rem; list-style-type: decimal; margin-bottom: 0.25rem;">$1</li>');

  // Wrap consecutive list items in <ul> or <ol>
  html = html.replace(/(<li[^>]*>.*<\/li>\s*)+/g, '<ul style="margin-bottom: 1rem;">$&</ul>');

  // Split by double line breaks to form blocks
  const blocks = html.split('\n\n');
  
  html = blocks.map(block => {
    // If block is already a structural element, return it
    if (block.trim().startsWith('<h') || block.trim().startsWith('<ul') || block.trim().startsWith('<blockquote')) {
      return block.trim();
    }
    // Otherwise wrap in paragraph
    return `<p style="margin-bottom: 1rem; line-height: 1.6; color: var(--text-secondary)">${block.trim()}</p>`;
  }).join('');

  // Handle single line breaks inside paragraphs
  html = html.replace(/(<\/?p[^>]*>)|(<br\s*\/?>)?\n/g, (match, ptag) => {
      if (ptag) return ptag;
      return '<br/>';
  });

  return html;
}
