
import './App.css'
import { TagLine } from './components/TagLine'
import AddFile from './components/AddFile'
function App() {

  return (
   <main className='flex flex-col items-center justify-center h-screen w-full p-10'>
<div className='text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 pt-32'>

   Shere any file <TagLine words={["pdf","xml","doc","txt","csv","xls","ppt","mp3","mp4","avi","png","jpg","jpeg","gif","svg","webp","zip","rar","7z","exe","pdf","xml","doc","txt","csv","xls","ppt","mp3","mp4","avi","png","jpg","jpeg","gif","svg","webp","zip","rar","7z","exe","pdf","xml","doc","txt","csv","xls","ppt","mp3","mp4","avi","png","jpg","jpeg","gif","svg","webp","zip","rar","7z","exe"]} />
</div>

<AddFile/>
   </main>
  )
}

export default App
