import Footer from "@/components/footer";
import NavigationBar from "@/components/navigationBar";
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Flag for client-side rendering

  useEffect(() => {
    setIsMounted(true); // Set flag to true when component mounts on client
  }, []);

  const images = [
    '/images/image1.jpeg',
    '/images/image2.jpeg',
    '/images/image3.jpeg',
  ];

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

const reactPlayerContent = isMounted ? (
    <div className="flex justify-center items-center p-0" style={{ height: '100%' }}>
      <ReactPlayer url="https://youtu.be/7VY3L7m6iyM" width="100%" height="100%" />
    </div>
  ) : null;


  return (
    <div className="body">
      <NavigationBar />
      <div className="relative w-full h-[50vh] overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Sliding Image"
          className="w-full h-full object-cover"
        />
        <button
          onClick={handlePrev}
          className="absolute inset-y-0 left-4 flex items-center justify-center p-2 rounded-full shadow-lg focus:outline-none"
        >
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute inset-y-0 right-4 flex items-center justify-center p-2 rounded-full shadow-lg focus:outline-none"
        >
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="container mx-auto p-0">
        <div className="grid gap-0 md:grid-cols-3 sm:grid-cols-1">
          
          {/* Box 1 */}
          <div className="bg-dark-green text-white flex flex-col justify-center items-center px-4 py-8">
            <h2 className="text-light-green text-2xl p-2">ഗ്രീൻ ക്ലീൻ കേരള-വൃക്ഷത്തൈ പരിപാലന മത്സരം -</h2>
            <p className="mt-4 px-2">
              പരിസ്ഥിതി ദിനത്തിലും തുടർന്നും നടുന്ന വൃക്ഷത്തൈകൾ വേനൽക്കാലത്ത്‌ സംരക്ഷിക്കുന്നതിനെ പ്രോത്സാഹിപ്പിക്കാൻ, അതിന്റെ കൂടെ ഓരോ മൂന്ന് മാസം കൂടുമ്പോഴും ഒരു സെൽഫി എടുത്ത് ഈ വെബ് സൈറ്റിൽ അപ്ലോഡ് ചെയ്താൽ ഭാഗ്യശാലികൾക് സമ്മാനങ്ങൾ നൽകുന്നു. കൂടാതെ…
            </p>
            <Link href="/project" legacyBehavior>
              <a className="text-light-green mt-2 self-start px-2" style={{ textDecoration: 'none' }}>Read more</a>
            </Link>
          </div>
          
          {/* Box 2 */}
          
          {reactPlayerContent}
        {/* Box 3 */}
           <div className="relative flex justify-center items-center bg-cover bg-center text-white p-4" style={{ backgroundImage: 'url(/images/image1.jpeg)' }}>
            <div className="bg-opacity-50 bg-none p-4">
              <h2 className="text-light-green text-2xl">ഹരിത കേരളം -സുന്ദര കേരളം -ഹരിത ശുചിത്വ മത്സരങ്ങൾ</h2>
              <p className="mt-4">
                ഹരിത കേരളം പദ്ധതിയുടെ വിജയത്തിനായി വിവിധ സ്ഥാപനങ്ങളുടെ കൂട്ടായ്മയായ Green Clean Kerala Mission സംഘടിപ്പിക്കുന്ന മത്സരാധിഷ്ഠിതമായ ഒരു പദ്ധതിയാണ് ഗ്രീൻ ക്ലീൻ കേരള -ഹരിത ശുചിത്വ മത്സരങ്ങൾ
              </p>
              <Link href="/project" legacyBehavior>
                <a className="text-light-green mt-2 self-start px-2" style={{ textDecoration: 'none' }}>Read more</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
     {/* container 1 */}
       <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs={12} className="text-center">
          <h1 className="mb-4" style={{ fontSize: '33px', padding: '15px', gap: '5px', fontWeight: 'bold' }}>
            ഒരുകോടി വൃക്ഷത്തൈ സെൽഫികളുമായി കേരളം UNEP യിലേക്ക്...
          </h1>
          <div className="d-flex justify-content-center my-4">
            <Image src="/images/line.png" alt="Line" style={{ width: '50%', height: '40px' ,marginLeft:'25%'}} />
          </div>
          <p className="mb-4" style={{ fontSize: '18px', padding: '14px', gap: '5px', color: '#373534' }}>
            കേരളത്തിൽ നിന്നും ഒരു കോടി വൃക്ഷത്തൈകൾ സംരക്ഷിച്ച്, അതിൻറെ ഓരോ മൂന്ന് മാസത്തെയും വളർച്ച പ്രകടമാവുന്ന ഫോട്ടോയും മറ്റു വിവരങ്ങളും <br />
            വെബ്സൈറ്റിൽ പ്രസിദ്ധീകരിച്ച് UNEP (United Nations Environmental Program) യിലേക്ക് സമർപ്പിക്കുവാനും , കേരളം സമ്പൂർണ്ണ മാലിന്യ മുക്തവും ഹരിതാഭവും, <br />
            സുരക്ഷിതവും ജല സമൃദ്ധവും ഊർജ്ജ സ്വയം പര്യാപ്തവും ആക്കുവാനുള്ള പ്രചരണ പ്രവർത്തനങ്ങൾ നടത്തുവാനും ഈ പദ്ധതിയിലൂടെ ലക്ഷ്യമിടുന്നു..
          </p>
        </Col>
      </Row>
    </Container>
    {/* container 2 */}
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs={12} className="text-center">
          <h1 className="mb-4" style={{ fontSize: '33px', padding: '15px', gap: '5px', fontWeight: 'bold' }}>
            ആയിരം കോടി രൂപയുടെ ഗ്രീൻ ക്ലീൻ എസ്റ്റിമേറ്റ്
          </h1>
          <div className="d-flex justify-content-center my-4">
            <Image src="/images/line.png" alt="Line" style={{ width: '50%', height: '40px' ,marginLeft:'25%'}} />
          </div>
          <p className="mb-4" style={{ fontSize: '18px', padding: '14px', gap: '5px', color: '#373534' }}>
            ഒരു കോടി വൃക്ഷത്തൈ സെൽഫികൾ UNEP ലേക്ക് സമർപ്പിക്കുന്നതൊടൊപ്പം കേരളം സമ്പൂർണ്ണ മാലിന്യമുക്തവും ഹരിതാഭവും ആക്കുവാനുള്ള പ്രവർത്തനം <br/>നടത്താൻ ആയിരം കോടി രൂപയുടെ ഗ്രീൻ ക്ലീൻ എസ്റ്റിമേറ്റ് തയ്യാറാക്കി കേരള സർക്കാർ മുഖേന കേന്ദ്രസർക്കാർ ,UNEP, NABARD, WORLD BANK, UNESCO <br/> എന്നിവക്ക് സമർപ്പിക്കുന്നതാണ്. ഓരോ വ്യക്തികളും സ്ഥാപനങ്ങളും സ്വന്തം അധീനതയിലുള്ള സ്ഥലങ്ങളും പരിസരവും സമ്പൂർണ്ണ മാലിന്യമുക്തവും ഹരിതാഭവും <br/> ആക്കുവാനുള്ള എസ്റ്റിമേറ്റ് തയ്യാറാക്കി ഈ വെബ്സൈറ്റിൽ സമർപ്പിക്കുകയാണ് ചെയ്യുന്നത്. ഇവ ക്രോഡീകരിച്ചാണ് ആയിരം കോടി രൂപയുടെ എസ്റ്റിമേറ്റ് <br></br>തയ്യാറാക്കുന്നത്. ഫണ്ട് ലഭ്യമാകുന്ന മുറക്ക് മികച്ച പ്രവർത്തനം കാഴ്ചവെക്കുന്ന വ്യക്തികൾക്കും സ്ഥാപനങ്ങൾക്കും അതാത് തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങൾ <br/> മുഖേനെ പ്രായോഗികത പരിഗണിച്ച് വിതരണം ചെയ്യുന്നതാണ്.
          </p>
        </Col>
      </Row>
    </Container>
    {/* container 3 */}
     <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs={12} className="text-center">
          <h1 className="mb-4" style={{ fontSize: '33px', padding: '15px', gap: '5px', fontWeight: 'bold' }}>
           പ്രൊഫസ്സർ ശോഭീന്ദ്രൻ സ്മാരക പരിസ്ഥിതി അവാർഡ് - <br/>
            ഒരു ലക്ഷം രൂപയുടെ പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും
          </h1>
          <div className="d-flex justify-content-center my-4">
            <Image src="/images/line.png" alt="Line" style={{ width: '50%', height: '40px' ,marginLeft:'25%'}} />
          </div>
          <p className="mb-4" style={{ fontSize: '18px', padding: '14px', gap: '5px', color: '#373534' }}>
            കേരളത്തിൽ പരിസ്ഥിതി പ്രവർത്തനങ്ങളിൽ മികച്ചപ്രകടനം നടത്തുന്ന വിദ്യാലയങ്ങൾക്കും , LSGD വാർഡുകൾക്കും -ഗ്രാമങ്ങൾക്കും , സന്നദ്ധ സംഘടനകൾക്കും , <br/> റെസിഡൻസ് അസ്സോസിയേഷനുകൾക്കും വിദ്യാർത്ഥികൾക്കും , അദ്ധ്യാപകർക്കും , വ്യക്തികൾക്കു മായി പ്രൊഫസ്സർ ശോഭീന്ദ്രൻ സാറിന്റെ പേരിൽ പ്രത്യേക <br/> പുരസ്കാരങ്ങളും ക്യാഷ് പ്രൈസും നൽകുന്നതാണ് . ആയതിനായി 2023 ജൂൺ 5 മുതൽ 2024 ജൂൺ 5 വരെ പ്രത്യേക ഹരിത മത്സരങ്ങൾ സംഘടിപ്പിക്കുന്നുണ്ട് .
            </p>
            <Link href="/project" legacyBehavior>
  <a className=" self-start" style={{ textDecoration: 'none',color:'blue' }}>Click here to Read more ...</a>
</Link>

        </Col>
      </Row>
    </Container>
    {/* container 4 */}
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs={12} className="text-center">
          <h1 className="mb-4" style={{ fontSize: '33px', padding: '15px', gap: '5px', fontWeight: 'bold' }}>
            ഹരിത മത്സരങ്ങൾ - 2023-24
          </h1>
          <div className="d-flex justify-content-center my-4">
            <Image src="/images/line.png" alt="Line" style={{ width: '50%', height: '40px' ,marginLeft:'25%'}} />
          </div>
          <p className="mb-4" style={{ fontSize: '18px', padding: '14px', gap: '5px', color: '#373534' }}>
            വൃക്ഷത്തൈ പരിപാലന മത്സരത്തിൻറെ പ്രചരണത്തിനായി വിദ്യാർഥികൾക്കും, അദ്ധ്യാപകർക്കും , പൊതുജനങ്ങൾക്കുമായി വിവിധ ഹരിത മത്സരങ്ങൾ സംഘടിപ്പിച്ച് <br/> വിജയികൾക്ക് പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും നൽകുന്നു. KG, LP, UP, HS, HSS, CLG, GENERAL എന്നീ വിഭാഗങ്ങളിൽ, വിദ്യാഭ്യാസ ഉപ ജില്ലാ തലം, വിദ്യാഭ്യാസ <br/>ജില്ലാതലം, ജില്ലാ തലം,സംസ്ഥാന തലം, എന്നിവയിൽ മികച്ച പ്രകടനം നടത്തുന്നവർക്ക് പ്രത്യേക പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും ഉണ്ടായിരിക്കുന്നതാണ്. കൂടാതെ <br/> ഗ്രാമപഞ്ചായത്തുകൾ ബ്ലോക്ക് പഞ്ചായത്തുകൾ മുനിസിപ്പാലിറ്റികൾ കോർപ്പറേഷനുകൾ എന്നീ തലങ്ങളിലെ പൊതു വിഭാഗത്തിൽ പെട്ടവർക്കും, വിദ്യാഭ്യാസ ജില്ല,<br/> വിദ്യാഭ്യാസ ഉപ ജില്ല എന്നീ എന്നീ തലങ്ങളിലുള്ള വിദ്യാലയ വിഭാഗത്തിൽ പെട്ടവർക്കും, തൽപ്പരരായ അതാത് പ്രദേശത്തെ സ്ഥാപനങ്ങളുടെ സഹകരണത്തോടുകൂടി <br/>പ്രത്യേക പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും ഏർപ്പെടുത്തുന്നതാണ്. പരിപാലിക്കുന്ന തൈകളുടെ ഓരോ മൂന്ന് മാസത്തെയും വളർച്ച പ്രകടമാവുന്ന ഫോട്ടൊ <br/>www.GreenCleanEarth.org എന്ന വെബ്സൈറ്റിൽ അപ്ലോഡ് ചെയ്യുന്ന ആർക്കും ഏതു മത്സരങ്ങളിലും പങ്കടുക്കാവുന്നതാണ്. കൂടുതൽ അറിയാൻ 
            <Link href="/project" legacyBehavior>
                <a className=" self-start" style={{ textDecoration: 'none',color:'blue' ,fontSize: '14px'}}> Click here ...</a>
          </Link>
          </p>
        </Col>
      </Row>
    </Container>
    {/* container 5 */}
     <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs={12} className="text-center">
          <h1 className="mb-4" style={{ fontSize: '33px', padding: '15px', gap: '5px', fontWeight: 'bold' }}>
            ഗ്രീനിങ് കോഴിക്കോട് - 2023-24
          </h1>
          <div className="d-flex justify-content-center my-4">
            <Image src="/images/line.png" alt="Line" style={{ width: '50%', height: '40px' ,marginLeft:'25%'}} />
          </div>
          <p className="mb-4" style={{ fontSize: '18px', padding: '14px', gap: '5px', color: '#373534' }}>
            കോഴിക്കോട് ജില്ലയെ സമ്പൂർണ്ണ മാലിന്യ മുക്തവും ഹരിതാഭവും വേണ്ടി കോഴിക്കോട് ജില്ലാ പഞ്ചായത്ത് സോയിൽ കൺസർവേഷൻ ഡിപ്പാർട്മെൻറ് മുഖേനെ ഗ്രീൻ <br/>ക്ലീൻ കേരള മിഷൻറെ സഹകരണത്തോടെ നടപ്പാക്കുന്ന പദ്ധതിയാണ് ഗ്രീനിങ് കോഴിക്കോട് . ഹരിത കേരള മിഷൻ, ശുചിത്വ മിഷൻ , കുടുംബശ്രീ, അഗ്രിക്കൾച്ചറൽ <br/>ഡിപ്പാർമെൻറ് , സോഷ്യൽ ഫോറെസ്റ്ററി,ബയോ ഡൈവേഴ്‌സിറ്റി ബോർഡ് , വിവിധ തദ്ദേശ സ്വയം ഭരണസ്ഥാപനങ്ങൾ എന്നിവ മുഖേനെ സർക്കാർ നടപ്പാക്കുന്ന <br/> പദ്ധതികൾ കൂടുതൽ ജനകീയമാക്കാൻ ഗ്രീൻ ക്ലീൻ കേരള മിഷന്റെ സഹകരണത്തോടെ വിവിധ ഹരിത മത്സരങ്ങൾ സംഘടിപ്പിക്കുകയും , വിജയികൾക്ക് ഗ്രീൻ ക്ലീൻ <br/>കേരള മിഷൻ സമ്മാനങ്ങൾ നൽകുകയും ചെയ്യുന്നു.
        </p>
        </Col>
      </Row>
    </Container>
    {/* container 6 */}
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs={12} className="text-center">
          <h1 className="mb-4" style={{ fontSize: '33px', padding: '15px', gap: '5px', fontWeight: 'bold' }}>
            ഗ്രീൻ ക്ലീൻ കേരള മിഷൻ
          </h1>
          <div className="d-flex justify-content-center my-4">
            <Image src="/images/line.png" alt="Line" style={{ width: '50%', height: '40px' ,marginLeft:'25%'}} />
          </div>
          <p className="mb-4" style={{ fontSize: '17px', padding: '14px', gap: '5px', color: '#373534' }}>
            ഒകോഴിക്കോട് ജില്ലയിലെ Forestry Club,ICDS, NSS, SPC, SCOUT & GUIDE, JRC, SAVE, Green Clean Earth Movement Foundation (GCEM Fondation), തുടങ്ങിയവയുടെ <br/> കൂട്ടായ്മയാണ് ഗ്രീൻ ക്ലീൻ കേരള മിഷൻ .കോഴിക്കോട് ജില്ലാ പഞ്ചായത്ത് സോയിൽ കൺസർവേഷൻ ഡിപ്പാർട്മെൻറ് , ഹരിത കേരള മിഷൻ, ശുചിത്വ മിഷൻ ,<br/> കുടുംബശ്രീ, അഗ്രിക്കൾച്ചറൽ ഡിപ്പാർമെൻറ് , സോഷ്യൽ ഫോറെസ്റ്ററി,ബയോ ഡൈവേഴ്‌സിറ്റി ബോർഡ് , വിവിധ തദ്ദേശ സ്വയം ഭരണസ്ഥാപനങ്ങൾ എന്നിവയുടെ <br/>സഹകരണത്തോടെയാണ് പദ്ധതികൾ ആവിഷ്‌കരിക്കുന്നത് . വിദ്യാർഥികളിലൂടെ ഹരിത ശുചിത്വ ബോധം സമൂഹത്തിൽ വ്യാപിപ്പിക്കുവാൻ വേണ്ടി വിവിധ ഹരിത <br/> മത്സരങ്ങൾ സംഘടിപ്പിച്ച് വിജയികൾക്ക് സമ്മാനങ്ങൾ നൽകുന്നു
          </p>
        </Col>
      </Row>
    </Container>
    {/* back button*/}
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:'5px'}}>
        <button style={{fontSize:'15px', color: 'white', backgroundColor: 'black' ,borderRadius:'5px', padding:'5px'}}>0</button>
        <button style={{fontSize:'15px', color: 'white', backgroundColor: 'black' ,borderRadius:'5px', padding:'5px'}}>1</button>
        <button style={{fontSize:'15px', color: 'white', backgroundColor: 'black' ,borderRadius:'5px', padding:'5px'}}>6</button>
        <button style={{fontSize:'15px', color: 'white', backgroundColor: 'black' ,borderRadius:'5px', padding:'5px'}}>0</button>
        <button style={{fontSize:'15px', color: 'white', backgroundColor: 'black' ,borderRadius:'5px', padding:'5px'}}>1</button>
        <button style={{fontSize:'15px', color: 'white', backgroundColor: 'black' ,borderRadius:'5px', padding:'5px'}}>6</button>
        <button style={{fontSize:'15px', color: 'white', backgroundColor: 'black' ,borderRadius:'5px', padding:'5px'}}>0</button>
        <button style={{fontSize:'15px', color: 'white', backgroundColor: 'black' ,borderRadius:'5px', padding:'5px'}}>2</button>
    </div>

    {/* container 7 */}
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs={12} className="text-center">
          <h1 className="mb-4" style={{ fontSize: '33px', padding: '15px', gap: '5px', fontWeight: 'bold' }}>
            നാഴികക്കല്ലുകൾ -ഗ്രീൻ ക്ലീൻ കേരള -വൃക്ഷത്തൈ പരിപാലന മത്സരം
          </h1>
          <div className="d-flex justify-content-center my-4">
            <Image src="/images/line.png" alt="Line" style={{ width: '50%', height: '40px' ,marginLeft:'25%'}} />
          </div>
          <p className="mb-4" style={{ fontSize: '15px', padding: '14px', gap: '7px', color: '#373534', }}>
            Conducted by Green Clean Kerala Mission- A confederation of Green Clean Eearth Movement(GCEM) Foundation, Forestry Club, NSS, SPC, Scout & Guide, JRC & SAVE.
In Association with Kozhikkode jilla panchayath Soil Conservation Department, Agricultural Department, Haritha Keralam Mission, Social forestry, Kudumbashree & ICDS.
Supported by indian Oil Corporation and myG, VKC,tecQ, Aqua garden, Mall of garden, AGRI SUPER MARKET, KISAN EXCEL, a2z4home.
          </p>
        </Col>
      </Row>
    </Container>
    
      <Footer />
    </div>
  );
};

export default Home;
