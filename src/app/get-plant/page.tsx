
import Footer from '@/components/footer'
import NavigationBar from '@/components/navigationBar'
import PageTitle from '@/components/sm/pageTitle'
import GceBadge from '@/components/gceBadge'

const Faq = () => {
  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar/>
      <div className='mx-2'>
        <PageTitle title='2025 പരിസ്ഥിതി ദിനത്തിൽ ഫലവൃക്ഷത്തൈകൾ സൗജന്യമായി ലഭിക്കാൻ' />
        <div className="mx-auto mb-6 flex flex-col gap-4 p-10 text-center">
          <div className="flex flex-col gap-2 bg-light-green p-8 rounded-3xl md:mx-6">
            <p className=''>ഗ്രീൻ ക്ലീൻ കോഴിക്കോട് പദ്ധതിയുടെ വിജയത്തിനായി ഇന്ത്യൻ ഓയിൽ കോർപറേഷൻറെ സഹകരണത്തോടെ ജിസം ഫൗണ്ടേഷൻ വിതരണം ചെയ്യുന്ന സൗജന്യ ഫലവൃക്ഷത്തൈകൾ ലഭിക്കാൻ ഹരിത ഗ്രാമ മത്സരത്തിൽ പങ്കെടുക്കുക.</p>
            <a href="" className='self-start bg-white p-3 rounded-2xl'>Click here to know more </a>
          </div>
          <a href="" className='text-lg text-primary font-medium '>വിത്തുകള്‍ നടുന്ന വിധം Click Here</a>
        </div>
      </div>
      <GceBadge />
      <Footer/>
    </main>
  )
}

export default Faq