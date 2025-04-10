import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-content" style={{ textAlign: 'left' }}>
      <ReactMarkdown 
        children={content} 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]}
        components={{
          // Custom table styling
          table: ({ node, ...props }) => (
            <div className="table-container" style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table 
                style={{ 
                  borderCollapse: 'collapse', 
                  width: '100%',
                  border: '1px solid #e0e0e0',
                  textAlign: 'left'
                }} 
                {...props} 
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead 
              style={{ 
                backgroundColor: '#f5f5f5',
                border: '1px solid #e0e0e0',
                textAlign: 'left'
              }} 
              {...props} 
            />
          ),
          tbody: ({ node, ...props }) => (
            <tbody style={{ textAlign: 'left' }} {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr 
              style={{ 
                borderBottom: '1px solid #e0e0e0',
                textAlign: 'left'
              }} 
              {...props} 
            />
          ),
          th: ({ node, ...props }) => (
            <th 
              style={{ 
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: 'bold',
                borderRight: '1px solid #e0e0e0'
              }} 
              {...props} 
            />
          ),
          td: ({ node, ...props }) => (
            <td 
              style={{ 
                padding: '8px 16px',
                borderRight: '1px solid #e0e0e0',
                textAlign: 'left'
              }} 
              {...props} 
            />
          ),
          // Code block styling
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div style={{ position: 'relative', textAlign: 'left' }}>
                <pre style={{ 
                  backgroundColor: '#f6f8fa', 
                  borderRadius: '6px',
                  padding: '16px',
                  overflowX: 'auto',
                  marginBottom: '1rem',
                  textAlign: 'left'
                }}>
                  <code className={className} style={{ textAlign: 'left' }} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code
                style={{
                  backgroundColor: '#f6f8fa',
                  padding: '0.2em 0.4em',
                  borderRadius: '3px',
                  fontSize: '85%',
                  fontFamily: 'monospace',
                  textAlign: 'left'
                }}
                className={className}
                {...props}
              >
                {children}
              </code>
            );
          },
          // Basic text styling with explicit left alignment
          p: ({ node, ...props }) => <p style={{ lineHeight: '1.6', marginBottom: '1rem', textAlign: 'left' }} {...props} />,
          h1: ({ node, children, ...props }) => (
            <h1 style={{ borderBottom: '1px solid #eaecef', paddingBottom: '.3em', marginTop: '1.5rem', marginBottom: '1rem', textAlign: 'left' }} {...props}>
              {children}
            </h1>
          ),
          h2: ({ node, children, ...props }) => (
            <h2 style={{ borderBottom: '1px solid #eaecef', paddingBottom: '.3em', marginTop: '1.5rem', marginBottom: '1rem', textAlign: 'left' }} {...props}>
              {children}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', textAlign: 'left' }} {...props}>
              {children}
            </h3>
          ),
          ul: ({ node, ...props }) => <ul style={{ paddingLeft: '2em', marginBottom: '1rem', textAlign: 'left' }} {...props} />,
          ol: ({ node, ...props }) => <ol style={{ paddingLeft: '2em', marginBottom: '1rem', textAlign: 'left' }} {...props} />,
          li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem', textAlign: 'left' }} {...props} />
        }}
      />
    </div>
  );
};

export default MarkdownRenderer; 