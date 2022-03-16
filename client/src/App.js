import { Fragment, useContext } from 'react';
import Navbar from './components/Navbar';
import { UserContext } from './reducer/UserContext';
import WebRouters from './WebRouters';

function App() {
  const userContext = useContext(UserContext);
  // console.log(userContext);
  
  if (
    userContext.theme === 'dark' ||
      (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
      document.documentElement.classList.add('dark')
  } else {
      document.documentElement.classList.remove('dark')
  }

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-700 dark:text-white">
        <Navbar />
        
        <WebRouters />
      </div>
    </Fragment>
  );
}

export default App;
