

function NotesCard({title,content}) {
    return (
        <div className="card mb-3" style={{ width: "100%" }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                <button className="btn btn-danger" style={{ width: "100%" }}>
                    Delete Note
                </button>
            </div>
        </div>
    )
}
export default NotesCard;
