import './App.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import ToDoItem from './Components/ToDoItem/ToDoItem.js';


function App () {
  return (
    <div className="App">
      <Header/>
      <ToDoItem/>
      <Footer/>
    </div>
  );
    
}
export default App;
