import NavigationBar from '@/components/navigationBar'
import PageTitle from '@/components/sm/pageTitle'
import GceBadge from '@/components/gceBadge'
import Footer from '@/components/footer'

const EVENT = 
  {
    id:1,
    title:'first ഹരിതഗ്രാമ മത്സരം-പങ്കെടുക്കുന്നവർ',
    content:'ഹരിതഗ്രാമ മത്സരം- രജിസ്ട്രേഷൻ തുടരുന്നു. പരിസ്ഥിതിദിനത്തിലും തുടർന്നും നട്ട തൈകൾ സംരക്ഷിക്കുന്നതിനെ പ്രോൽസാഹിപ്പിക്കാനായി വിവിധ സ്ഥാപനങ്ങളുടെ സഹകരണത്തോടെ ജീസം ഫൗണ്ടേഷൻ സംഘടിപ്പിക്കുന്ന ഹരിത ഗ്രാമ മൽസരത്തിൽ ഇത് വരെ രജിസ്‌ട്രേഷൻ പൂർത്തിയാക്കിയ സ്ഥാപനങ്ങളുടെ പേര് ഇവിടെ പ്രസിദ്ധീകരിക്കുന്നു. 2020 ജൂലൈ 10 വരെ മത്സരത്തിൽ പങ്കെടുക്കാവുന്നതാണ് ഓരോരുത്തരും പരിപാലിക്കുന്ന തൈകളുടെ ഫോട്ടോ എടുത്ത് ഈ വെബ്സൈറ്റിൽ അപ്‌ലോഡ് ചെയ്ത് കൊണ്ടാണ് മത്സരത്തിൽ പങ്കെടുക്കേണ്ടത് . വ്യക്തികൾക്കും, വിദ്യാലയങ്ങൾ, റസിഡൻസ് അസോസിയേഷനുകൾ സന്നദ്ധ സംഘടനകൾ പ്രത്യേക സ്ഥാപനങ്ങൾ എന്നിവർക്ക് ഗ്രൂപ്പ് ആയും പങ്കെടുക്കാവുന്നതാണ്. മികച്ച പ്രകടനം കാഴ്ച വെക്കുന്നവർക്ക് സമ്മാനമായി ഫലവൃക്ഷത്തൈകൾ , പൂച്ചെടികൾ,പച്ചക്കറി തൈകൾ, വിത്തുകൾ , വളം, കാർഷിക ഉപകരണങ്ങൾ, ഇന്ത്യൻ ഓയിൽ കോർപ്പറേഷൻറെ സൗജന്യ പെട്രോൾ കാർഡുകൾ,സോളാർ ഉപകരണങ്ങൾ ,മാലിന്യ സംസ്കരണ ബിന്നുകൾ ,സ്വർണ്ണ നാണയങ്ങൾ , സ്മാർട്ട് ഫോണുകൾ എന്നിവയും ഹരിത പുരസ്കാരവും നൽകുന്നതാണ് .',
    image:'',
    date:'20 June 2020'
  };

const Events = () => {
  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar/>
      <div className='mx-2'>
        <PageTitle title='Events and News' />
        <div className='flex flex-col items-center gap-2 mx-4 my-4 md:mx-24 px-4 py-6 bg-light-gray'>
          <h2 className='text-2xl font-semibold'>{ EVENT.title }</h2>
          <div className="h-52 w-80 bg-primary"></div>
          <p className='text-left md:text-center'>{ EVENT.date }</p>
          <p>{ EVENT.content }</p>
        </div>
      </div>
      <GceBadge />
      <Footer/>
    </main>
  )
}

export default Events