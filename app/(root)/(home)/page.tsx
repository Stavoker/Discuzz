import MeetingTypeList from '@/components/ui/MeetingTypeList';
import TextChanger from './TextChanger';

const Home = () => {
  const currentTime = new Date();
  const time = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const date = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      
      
      

      <MeetingTypeList />
    </section>
  )
}

export default Home