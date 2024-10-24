import "./index.css";

export default function Note(props) {
    return (
        <div>
            <h3>{props.note.title}</h3>
            <div>
                <p>Audio Blob</p>
                {props.audio && <audio controls src={props.audio} />}
            </div>
        </div>
    );
}