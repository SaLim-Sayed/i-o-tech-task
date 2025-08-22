const CustomStyles: React.FC = () => (
    <style jsx global>{`
        .custom-pagination {
            position: fixed !important;
            left: 16px;
            
            bottom: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 30;
            display: flex !important;
            flex-direction: column !important;
            gap: 12px;
            pointer-events: auto;
        }

        .custom-bullet {
            margin-bottom: 5px;
            width: 12px !important;
            height: 12px !important;
            background: rgba(255, 255, 255, 0.5) !important;
            border-radius: 50% !important;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent !important;
            opacity: 1 !important;
        }

        .custom-bullet:hover {
            background: rgba(255, 255, 255, 0.8) !important;
            transform: scale(1.1);
        }

        .custom-bullet-active {
            background: white !important;
            border-color: rgba(255, 255, 255, 0.3) !important;
            transform: scale(1.2);
        }

        /* RTL Support */
        [dir="rtl"] .custom-pagination {
            left: auto;
            right: 16px;
        }

        /* Desktop positioning */
        @media (min-width: 640px) {
            .custom-pagination {
                left: 32px;
            }
            
            [dir="rtl"] .custom-pagination {
                left: auto;
                right: 32px;
            }
        }

        @media (min-width: 1024px) {
            .custom-pagination {
                left: 64px;
            }
            
            [dir="rtl"] .custom-pagination {
                left: auto;
                right: 64px;
            }
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
            .custom-pagination {
                left: 16px !important;
                gap: 8px;
            }
            
            [dir="rtl"] .custom-pagination {
                left: auto !important;
                right: 16px !important;
            }
            
            .custom-bullet {
                width: 10px !important;
                height: 10px !important;
            }
        }
    `}</style>
);

export default CustomStyles;