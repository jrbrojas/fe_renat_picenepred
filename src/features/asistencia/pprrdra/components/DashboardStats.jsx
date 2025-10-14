const DashboardStats = ({ title, icon, value, description, colorIndex }) => {

    const COLORS = ["primary", "primary"]

    const getDescStyle = () => {
        if (description.includes("↗︎")) return "font-bold text-green-700"
        else if (description.includes("↙")) return "font-bold text-rose-500"
        else return ""
    }

    return (
        <div className="border-2 shadow stats bg-base-200/50">
            <div className="stat">
                <div className={`stat-figure text-${COLORS[colorIndex % 2]}`}>{icon}</div>
                <div className="stat-title">{title}</div>
                <div className={`stat-value text-${COLORS[colorIndex % 2]}`}>{value}</div>
                <div className={"stat-desc  " + getDescStyle()}>{description}</div>
            </div>
        </div>
    )
}

export default DashboardStats
