import { ChangeEvent, useState } from 'react'
import axios from 'axios';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [notification, setNotification] = useState('');

  const handleFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0]);
    }
  }

  const handleSendFile = async () => {
    setNotification('');
    if (file) {
      try {    
        // const fileData = new FormData();
        // fileData.append('file', file);
        const response = await axios.post('https://wmkww4rgyf.execute-api.eu-west-2.amazonaws.com/dev/hello', file, {
          headers: {
            Accept: 'application/json',
            Authorization: '',
            "Content-Type": 'application/pdf',
          }
        });
        return setNotification(response.data.message);
      } catch (e) {
        console.log('error uploading document');
        return setNotification('error uploading document');
      }
    }
    return setNotification('no file is set');
  }

  return (
    <div className="App">
      <input onChange={handleFileChanged} type="file"></input>
      <button onClick={handleSendFile}>Send To Backend</button>
      <p>{notification}</p>
    </div>
  )
}

export default App
