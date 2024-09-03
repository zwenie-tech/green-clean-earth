
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
              <AccordionTrigger>CORDINATOR രജിസ്‌ട്രേഷൻ എങ്ങിനെ?</AccordionTrigger>
              <AccordionContent>
                <ol className='px-4 list-decimal'>
                  <li>മത്സരത്തിൽ  പങ്കെടുക്കുന്ന  സ്ഥാപനത്തിലെ   കോർഡിനേറ്റർമാർ ആദ്യം സ്ഥാപനത്തിന്റെ  വിശദാംശങ്ങൾ www.GreenCleanEarth.org  എന്ന  ഈ വെബ്‌സൈറ്റിൽ   നൽകി  കോർഡിനേറ്റർ രജിസ്ട്രഷൻ ചെയ്യേണ്ടതാണ് . ഇത്  ഒരു സ്ഥാപനത്തിൽ  നിന്നും  ഒരിക്കൽ  മാത്രം  ചെയ്താൽ  മതി.</li>
                  <li>അതിന്  ശേഷം കോർഡിനേറ്റർ  വെബ്‌സൈറ്റിൽ  നിന്നും  ലഭിക്കുന്ന  ഒരു  ലിങ്ക്  സ്ഥാപനത്തിലെ  മുഴുവൻ  വിദ്യാർത്ഥികൾക്കും  അദ്ധ്യാപകർക്കും അയച്ച് കൊടുക്കേണ്ടതാണ്.</li>
                  <li>കോർഡിനേറ്റർമാർക്ക്  രെജിസ്റ്റർ  ചെയ്യാൻ ഒരു  REFERAL CODE  എന്റർ ചെയ്യേണ്ടതുണ്ട്.</li>
                  <li>നിങ്ങളുടെ  PROMOTER  നിങ്ങളെ  INVITE  ചെയ്യുമ്പോൾ  നിങ്ങൾക്ക്  ലഭിക്കുന്ന CODE  ആണ്  REFERAL  CODE .ആരും  നിങ്ങളെ  INVITE  ചെയ്യാതെയാണ്  നിങ്ങൾ  ഈ മത്സരത്തിൽ  പങ്കെടുക്കുന്നതെങ്കിൽ   REFERAL  CODE 
                  ലഭിക്കാൻ 9645964592  എന്ന  നമ്പറിൽ  WHATASPP  ചെയ്യുക .</li>
                </ol>
                <div className="mt-4">
                  <a 
                    href="https://youtu.be/SlF--brGIHE?si=K-hM57fLt5VZlgnq" 
                    className="text-primary underline hover:text-green-700"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className='bg-light-gray px-4 rounded-xl'>
              <AccordionTrigger>USER രജിസ്‌ട്രേഷൻ എങ്ങിനെ?</AccordionTrigger>
              <AccordionContent>
                <p>നിങ്ങളുടെ  സ്ഥാപനത്തിലെ കോർഡിനേറ്റർ  അയച്ച്  തന്ന  ലിങ്കിൽ  ക്ലിക്ക്  ചെയ്ത് സ്വന്തം  ഫോൺ  നമ്പർ ഉപയോഗിച്ച്   ഒരു  പാസ്സ്‌വേർഡ്  ക്രിയേറ്റ്  ചെയ്ത് USER  ആയി രജിസ്റ്റർ ചെയ്യേണ്ടതാണ് . കോർഡിനേറ്റരും മത്സരത്തിൽ  പങ്കെടുക്കുന്ന  എല്ലാ  അദ്ധ്യാപകരും  വിദ്യാർത്ഥികളും USER രജിസ്‌ട്രേഷൻ നടത്തേണ്ടതാണ് . തുടർന്ന്  LOGIN  ചെയ്ത്  മത്സരത്തിൽ  പങ്കെടുക്കാവുന്നതാണ്.</p>
                <div className="mt-4">
                  <a 
                    href="https://youtu.be/yO4RHNa7xRs?si=mGrnuMg3WzlK6txo" 
                    className="text-primary underline hover:text-green-700"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className='bg-light-gray px-4 rounded-xl'>
              <AccordionTrigger>തൈകൾ  അപ്‌ലോഡ്  ചെയ്യുന്നതെങ്ങിനെ ?</AccordionTrigger>
              <AccordionContent>
              <p>
              നിങ്ങളുടെ  സ്ഥാപനത്തിലെ കോർഡിനേറ്റർ  അയച്ച്  തന്ന  ലിങ്കിൽ  ക്ലിക്ക്  ചെയ്ത് സ്വന്തം  ഫോൺ  നമ്പർ ഉപയോഗിച്ച്   ഒരു  പാസ്സ്‌വേർഡ്  ക്രിയേറ്റ്  ചെയ്ത് USER  ആയി രജിസ്റ്റർ  ചെയ്തതിന്  ശേഷം  LOGIN  ചെയ്ത്  DASH BORD ൽ  പോയി  UPLOAD  PLANTS  എന്ന  ബട്ടൺ  ക്ലിക്ക്  ചെയ്ത്  അപ്‌ലോഡ് ചെയ്യാവുന്നതാണ് .
              </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className='bg-light-gray px-4 rounded-xl'>
              <AccordionTrigger>ഹരിത  - കലാ മത്സരങ്ങളിൽ  സൃഷ്ടികൾ  സമർപ്പിക്കുന്നതെങ്ങിനെ?</AccordionTrigger>
              <AccordionContent>
              <p>
              മത്സരാർത്ഥികൾ പ്രകടനത്തിന്റെ  വീഡിയോ തയ്യാറാക്കിയതിന്   ശേഷം,    സ്‌കൂൾ  കോർഡിനേറ്റർ ആയ  അദ്ധ്യാപകനെ  സമീപിച്ച് IGAR Number (Institution Green Art fest Registration Number)   വാങ്ങിയതിന്  ശേഷം   9645964592  എന്ന നമ്പറിലേക്ക് Whatsapp / Telegram വഴി send ചെയ്യേണ്ടതാണ് .
              <br/>
              <br/>
              IGAR നമ്പർ  ഇല്ലാതെ  അയക്കുന്ന  വീഡിയോകൾ  മത്സരത്തിൽ  പരിഗണിക്കുന്നതല്ല .
              <br/>
              <br/>
              ചാനലിൽ  Title കൊടുക്കുവാൻ  വേണ്ടി ഓരോ കലാ സൃഷ്ടിയോടുമൊപ്പം   താഴെ  ചേർത്ത    വിവരങ്ങൾ  അതേഓർഡറിൽ  ഇംഗ്ലീഷിൽ ടെക്സ്റ്റ്  ആയി അയക്കേണ്ടതാണ് .
              <br/>
              <br/>
              Name of competition- Name of student- Name of Institution(mention KG/ LP/UP/HS/HSS/College)-Students /IGAR Number
              </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className='bg-light-gray px-4 rounded-xl'>
              <AccordionTrigger>എന്താണ് TREE NUMBER?</AccordionTrigger>
              <AccordionContent>
              <p>
              നിങ്ങൾഈ വെബ്‌സൈറ്റിൽ അപ്ലോഡ് ചെയ്ത വൃക്ഷത്തൈകളുടെ രെജിസ്ട്രേഷൻ നമ്പറുകളാണ് നിങ്ങളുടെ TREE NUMBER. Login ചെയ്തതിന് ശേഷം PARICIPANT LIST-ൽ നിങ്ങൾ അപ്ലോഡ് ചെയ്ത വൃക്ഷത്തൈയുടെ ഫോട്ടോയുടെ ഇടത് ഭാഗത്ത് നിങ്ങളുടെ TREE NUMBER കാണാവുന്നതാണ്. ഈ നമ്പർ പ്രകാരമാണ് നറുക്കെടുപ്പിൽ സമ്മാനങ്ങൾ നൽകുന്നത്.
              <br/>
              <br/>
              കലാമത്സരങ്ങളിൽ  പങ്കെടുക്കാനും  TREE NUMBER  ഓ  ഹരിത  മത്സരങ്ങളിൽ  പങ്കെടുത്തതിന്റെ  CHEST NUMBER  ഓ  ചേർക്കേണ്ടതാണ് .
              </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className='bg-light-gray px-4 rounded-xl'>
              <AccordionTrigger>എന്താണ്  CHEST  NUMBER ?</AccordionTrigger>
              <AccordionContent>
              <p>
              നിങ്ങളുടെ  വീഡിയോകൾ  GREEN CLEAN KERALA  എന്ന യൂട്യൂബ്  ചാനലിൽ  അപ്‌ലോഡ്  ചെയ്യുമ്പോൾ   സംഘാടകർ  അതിന്ന്  നൽകുന്ന  പ്രത്യേക  നമ്പറാണ്  CHEST NUMBER.
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