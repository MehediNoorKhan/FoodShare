// src/components/AddFoodSkeleton.jsx
const AddFoodSkeleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-white/30 rounded"></div>
            <div className="h-12 bg-white/30 rounded"></div>
            <div className="h-12 bg-white/30 rounded"></div>
            <div className="h-12 bg-white/30 rounded"></div>
            <div className="h-12 bg-white/30 rounded"></div>
            <div className="h-24 bg-white/30 rounded"></div>
            <div className="h-12 bg-green-500/60 rounded"></div>
        </div>
    );
};

export default AddFoodSkeleton;
