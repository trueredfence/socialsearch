import Showresult from '@components/Showresult'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
      Social Media Presence
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> With Mobile & Email</span>
    </h1>
    <p className='desc text-center'>
      This tool is designed to search social media presence with email and mobile number. We provide 99% accurate data. We don't share or save any query or information provided by you on this platform.
    </p>    
    <h5 className='support_text text-center'>For Sales & Support  <br/> <span className='orange_gradient text-center'>support@bytesec.in</span></h5>
    <Showresult />
    </section>
  )
}

export default Home