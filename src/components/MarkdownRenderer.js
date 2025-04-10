import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-content">
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
              }} 
              {...props} 
            />
          ),
          tbody: ({ node, ...props }) => (
            <tbody {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr 
              style={{ 
                borderBottom: '1px solid #e0e0e0',
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
                borderRight: '1px solid #e0e0e0',
              }} 
              {...props} 
            />
          ),
          td: ({ node, ...props }) => (
            <td 
              style={{ 
                padding: '8px 16px',
                borderRight: '1px solid #e0e0e0',
              }} 
              {...props} 
            />
          ),
          // Code block styling
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div style={{ position: 'relative' }}>
                <pre style={{ 
                  backgroundColor: '#f6f8fa', 
                  borderRadius: '6px',
                  padding: '16px',
                  overflowX: 'auto',
                  marginBottom: '1rem',
                }}>
                  <code className={className} {...props}>
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
                }}
                className={className}
                {...props}
              >
                {children}
              </code>
            );
          },
          // Basic text styling
          p: ({ node, ...props }) => <p style={{ lineHeight: '1.6', marginBottom: '1rem' }} {...props} />,
          h1: ({ node, children, ...props }) => (
            <h1 style={{ borderBottom: '1px solid #eaecef', paddingBottom: '.3em', marginTop: '1.5rem', marginBottom: '1rem' }} {...props}>
              {children}
            </h1>
          ),
          h2: ({ node, children, ...props }) => (
            <h2 style={{ borderBottom: '1px solid #eaecef', paddingBottom: '.3em', marginTop: '1.5rem', marginBottom: '1rem' }} {...props}>
              {children}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }} {...props}>
              {children}
            </h3>
          ),
          ul: ({ node, ...props }) => <ul style={{ paddingLeft: '2em', marginBottom: '1rem' }} {...props} />,
          ol: ({ node, ...props }) => <ol style={{ paddingLeft: '2em', marginBottom: '1rem' }} {...props} />,
          li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />
        }}
      />
    </div>
  );
};

export default MarkdownRenderer; 