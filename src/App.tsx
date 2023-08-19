import { Link } from "react-router-dom";
import transcriptsId from "./constants/transcriptIds";

function App() {
  return (
    <div className="app-container">
      <section>
        <ul>
          {transcriptsId.map((transcript: any) => {
            return <li><Link to={`transcripts/${transcript.tId}`}>{transcript.name}</Link></li>
          })}
        </ul>
      </section>     
    </div>
  )
}

export default App;