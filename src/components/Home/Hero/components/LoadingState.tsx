const LoadingState: React.FC = () => (
    <div className="flex items-center justify-center h-screen bg-black">
        <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <div className="text-white text-xl">Loading slides...</div>
        </div>
    </div>
);

export default LoadingState;