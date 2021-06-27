export default function Comment(props) {
    console.log('Protected page props: ', props);
    return (
        <div>
            {props.user._json.name && <p>{props.user._json.name}</p>}
            <textarea placeholder="Join the conversation..." />
        </div>
    );
}
