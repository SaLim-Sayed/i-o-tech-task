// src/utils/richtextRenderer.tsx
import React from 'react';
import { RichTextChild, RichTextContent } from '../../types/service'; // Adjust path if needed

interface RichTextRendererProps {
  content: RichTextContent[] | null;
  className?: string;
  bulletColorClass?: string; // Tailwind class for bullet background color
}

// Helper to render nested rich text children (e.g., text, bold, italic)
const renderRichTextChildren = (children: RichTextChild[]): React.ReactNode => {
  return children.map((child, index) => {
    let textNode: React.ReactNode = null;

    if (child.type === 'text' && child.text) {
      textNode = <span key={index}>{child.text}</span>;

      // Apply formatting if specified
      if (child.bold) {
        textNode = <strong key={index}>{textNode}</strong>;
      }
      if (child.italic) {
        textNode = <em key={index}>{textNode}</em>;
      }
      if (child.underline) {
        textNode = <u key={index}>{textNode}</u>;
      }
    } else if (child.children && child.children.length > 0) {
      // Recursively render children if a block element contains them
      textNode = <React.Fragment key={index}>{renderRichTextChildren(child.children)}</React.Fragment>;
    }
    return textNode;
  });
};

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className, bulletColorClass = 'bg-gray-700' }) => {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {content.map((block, index) => {
        if (block.type === 'paragraph' && block.children) {
          return (
            <p key={index} className="mb-2 last:mb-0">
              {renderRichTextChildren(block.children)}
            </p>
          );
        }
        if (block.type === 'list' && block.children) {
          // Assuming Strapi's rich text editor outputs 'list' type for unordered lists
          return (
            <ul key={index} className="list-none space-y-1 mb-2">
              {block.children.map((listItem, liIndex) => {
                if (listItem.type === 'list-item' && listItem.children) {
                  return (
                    <li key={liIndex} className="flex items-start">
                        {/* Square bullet point styling as seen in the image */}
                        <span className={`inline-block w-2 h-2 ${bulletColorClass} mt-[0.5rem] mr-2 flex-shrink-0`}></span>
                        {/* Wrap content in a div to ensure text aligns correctly with the bullet, even if it wraps */}
                        <div className="flex-1">
                            {renderRichTextChildren(listItem.children)}
                        </div>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          );
        }
        // Add more block types (e.g., heading, quote, image) if your rich text supports them
        return null;
      })}
    </div>
  );
};

export default RichTextRenderer;