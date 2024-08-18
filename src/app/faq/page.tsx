
import Footer from '@/components/footer'
import NavigationBar from '@/components/navigationBar'
import PageTitle from '@/components/sm/pageTitle'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import GceBadge from '@/components/gceBadge'
import JoinNow from '@/components/joinNow'

const Faq = () => {
  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar/>
      <div className='mt-6'>
        <PageTitle title='FAQ' />
        <div className="max-w-screen-xl mx-auto p-4 mb-6">
          <Accordion type="single" collapsible className='flex flex-col gap-6'>
            <AccordionItem value="item-1" className='bg-light-gray px-4 rounded-xl'>
              <AccordionTrigger>എങ്ങിനെ അപ്ലോഡ് ചെയ്യാം?</AccordionTrigger>
              <AccordionContent>
                <ol className='px-4 list-decimal'>
                  <li>www.GreenCleanEarth.org എന്ന വെബ്സൈറ്റ് ഓപ്പൺ ചെയ്തു Register എന്ന ബട്ടൺ ക്ലിക്ക് ചെയ്തുനിങ്ങളുടെ പേരും  മൊബൈൽ നമ്പറും നൽകി സബ്മിറ്റ് ചെയ്യുക .എസ്എംഎസ് ആയി ലഭിക്കുന്ന OTP  എന്റർ ചെയ്തു രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുക.</li>
                  <li>തുടർന്ന് login  ചെയ്തു Upload plants എന്ന ബട്ടൺ ക്ലിക്ക് ചെയ്ത് ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.</li>
                  <li>അതിനുശേഷം My uploads  എന്ന ബട്ടൺ ക്ലിക്ക് ചെയ്ത് വിശദ വിവരങ്ങൾ നൽകുക.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className='bg-light-gray px-4 rounded-xl'>
              <AccordionTrigger>എന്താണ് TREE NUMBER?</AccordionTrigger>
              <AccordionContent>
              <p>നിങ്ങൾഈ വെബ്‌സൈറ്റിൽ അപ്ലോഡ് ചെയ്ത വൃക്ഷത്തൈകളുടെ രെജിസ്ട്രേഷൻ നമ്പറുകളാണ് നിങ്ങളുടെ TREE NUMBER. Login ചെയ്തതിന് ശേഷം PARICIPANT LIST-ൽ നിങ്ങൾ അപ്ലോഡ് ചെയ്ത വൃക്ഷത്തൈയുടെ ഫോട്ടോയുടെ ഇടത് ഭാഗത്ത് നിങ്ങളുടെ TREE NUMBER കാണാവുന്നതാണ്. ഈ നമ്പർ പ്രകാരമാണ് പ്പിൽ സമ്മാനങ്ങൾ നൽകുന്നത്.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className='bg-light-gray px-4 rounded-xl'>
              <AccordionTrigger>എന്താണ് GROUP CODE?</AccordionTrigger>
              <AccordionContent>
              <p>
                പരിസ്ഥിതി തൽപരരായ സന്നദ്ധ സംഘടനകൾ, വിദ്യാലയങ്ങൾ, സ്ഥാപനങ്ങൾ, സർക്കാർ ഓഫീസുകൾ, റസിഡൻസ് അസ്സോസ്സിയേഷനുകൾ, സോഷ്യൽ മീഡിയ കൂട്ടായ്മകൾ, കുടുംബശ്രീ യൂണിറ്റുകൾ എന്നിവയ്ക്ക് ഗ്രൂപ്പ് ആയി മത്സരത്തിൽ പങ്കെടുക്കാവുന്നതാണ്. ഇങ്ങനെ മത്സരത്തിൽ പങ്കെടുക്കാൻ അപേക്ഷ നൽകിയ ഓരോ ഗ്രൂപ്പുകൾക്കും സംഘാടകർ പ്രത്യേകം നൽകുന്ന കോഡ് ആണ് GROUP CODE.
                <br />ഒരു സ്ഥാപനത്തിലെ മുഴുവൻ പേർക്കും ഒരേ ഗ്രൂപ്പ് കോഡ് ആയിരിക്കുന്നതാണ്.
                ഓരോ ഗ്രൂപ്പിലെ പ്രവർത്തകരും തൈകൾ അപ്ലോഡ് ചെയ്യുമ്പോൾ അവരവരുടെ GROUP CODE സെലക്ട് ചെയ്യേണ്ടതാണ്. പങ്കെടുക്കുന്ന ഗ്രൂപ്പുകൾക്ക് സ്വന്തം ഗ്രൂപ്പിൽ ഏറ്റവും മികച്ച പ്രകടനം കാഴ്ച വെക്കുന്ന മെമ്പർമാരെ തിരഞ്ഞെടുക്കാനും അവർക്ക് പ്രത്യേക സമ്മാനം നൽകാനും അവസരം ലഭിക്കുന്നതാണ്.
                <br />GROUP CODE ലഭിച്ചിട്ടില്ലാത്ത വ്യക്തികൾക്ക് മത്സരത്തിൽ പങ്കെടുക്കാൻ No GROUP CODE എന്ന് സെലക്ട് ചെയ്താൽ മതി.
                <br />GROUP CODE ലഭിച്ചിട്ടുള്ളവർ സ്വന്തം കൂട്ടായ്മയുടെ ഗ്രൂപ്പ് കാറ്റഗറി സെലക്ട് ചെയ്തതിന് ശേഷം GROUP CODE സെലക്ട് ചെയ്യുക.
                <br />താങ്കളുടെ സ്ഥാപനത്തിന്റെ GROUP CODE അറിയാനും പുതിയ ഗ്രൂപ്പ് കോഡ് ലഭിക്കാനും ഇവിടെ <a href="">CLICK</a> ചെയ്യുക.
              </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <GceBadge />
      <Footer/>
    </main>
  )
}

export default Faq