import { Link } from "react-router-dom";
import { TRANSCRIPT_IDS } from "./constants/app.constant";
import { transcriptProp } from "./types";


function App() {
  return (
    <div className="app-container">
      <section>
        <ul>
          {TRANSCRIPT_IDS.map((transcript: transcriptProp) => {
            return <li><Link to={`transcripts/${transcript.TID}`}>{transcript.NAME}</Link></li>
          })}
        </ul>
      </section>     
    </div>
  )
}

export default App;