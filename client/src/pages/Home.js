import React from 'react'
import {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import landscapePhoto from '../assets/landscape.jpeg'
import njovu from '../assets/njovuClan.jpeg'

export default function Home() {

    const { currentUser } = useAuth()


    const [scrollEvent, setScrollEvent] = useState(false)


    //unblurs the image after the user scrolls down
    useEffect(()=> {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY
            console.log(scrolled)
            setScrollEvent(scrolled>100)
        })
    }, [])

    async function getCustomClaims() {
    await currentUser.getIdTokenResult().then(token => {
        console.log(token.claims.admin)})
    }
    getCustomClaims()

    const scrollDown = () => document.getElementById('middle').scrollIntoView()

    return (
        <div> 
            <div className=" w-screen w-max-screen overflow-hidden h-screen max-h-screen flex flex-col">
                <Navbar></Navbar> 
                <div className=" bg-blue-600 flex flex-col items-center flex-1 justify-between py-16 md:py-8">
                    <h1 className=" px-3 text-sky-100 max-w-[40rem] text-center text-3xl ">
                        Explore your Buganda Ancestry and Connect with real People
                    </h1>
                    <button className="rounded-full w-32 h-8 text-sm bg-sky-500 text-white opacity-70" onClick={scrollDown}>Discover Clan</button>
                    <div className="grid flex ">
                        <img className={`w-[85vw] md:w-auto md:h-[50vh] border-left-4 opacity-75 rounded-lg shadow-2xl ${scrollEvent ? "" : "blur-[2px]"}`} src={landscapePhoto}/>
                    </div>
                    
                </div>
                
            </div>
            <div className="flex md:flex-row flex-col text-white" id="middle">
                <div className="bg-[#011936] md:w-1/2 flex flex-col items-center ">
                    <div className="md:w-[30vw] w-[60vw] flex flex-col items-start object-contain">
                        <h2 className="mt-[10vh] text-white max-w-[40rem] text-center text-3xl "> Njovu Clan - Elephant</h2>
                        <img className="flex-1 self-center max-h-[25vh] mt-[5vh] border-left-4 opacity-75 rounded-lg shadow-2xl mb-[4vh]" src={njovu}/>
                        <h2 className="mt-[3vh] mb-4 text-white max-w-[40rem] text-center text-2xl "> General Info</h2>
                        <div className="ml-4">
                            <p className="mb-1">Ow'Akasolya (Clan Head): Mukalo</p>
                            <p className="mb-1">Akabbiro ( Sub-Totem): Nvubu (Hippopotamus)</p>
                            <p className="mb-1">Obutaka (Clan Seat): Kambugu, Busiro</p>
                            <p className="mb-1">Omubala (Clan Motto): Nsimbye Amasanga, Nakate ajja</p>
                        </div>
                    </div>
                    <div className="h-[10vh]"></div>
               </div>
                    
                <div className="bg-[#EF6F6C] flex flex-col items-center flex-1">
                    <div className="md:w-[40vw] w-[80vw]  flex flex-col items-start">
                        <h2 className="mt-[10vh] mb-4 text-white max-w-[40rem] text-center text-2xl "> Clan Elders</h2>
                        
                        <div className="ml-4">
                            <p className="mb-1">Kikomeko at Lubu, Mawokota</p>
                            <p className="mb-1">Ggulu at Busabala, Kyaddondo</p>
                            <p className="mb-1">Kakembo at Zzirannumbu, Kyaddondo</p>
                            <p className="mb-1">Ntambi at Lubya, Kyaddondo</p>

                            <p className="mb-1">Ssebanyiiga at Kyazi(kojja), Kyaggwe</p>
                            <p className="mb-1">Ssentomero at Zzinga, Kyaggwe</p>
                            <p className="mb-1">Ssemakadde at Mpuku, Kyaggwe</p>
                        </div>

                        <h2 className="mt-[3vh] text-white max-w-[40rem] text-center text-2xl "> Nvoju Names</h2>
                        <div className="ml-4">
                            <h2 className="mt-[3vh] mb-4 text-white max-w-[40rem] text-lg "> Male Names:</h2>
                            <p>
                            Ssemmambo, Ggalabuzi, Kikomeko, Ssevviiri,  Batte, Sseddyabanne, Ssentulubalo, Ssezzooba, Ssettyabule, Kiro, Ssebbaale, Ssessanga, Ssenteza, Ssozi, Ssegujja, Ssekandi, Ssekimpi, Wavvuvuumira, Kayaaye, Ssengo, Katunda, Kayiga, Ssenyomo, Ssemaanyi, Ssemukina, Nkayiivu, Ssensalire, Kakembo, Ssentomero, Mbazzi, Ntambi, Muzingu, Bitalo.
                            </p>
                            <h2 className="mt-[3vh] mb-4 text-white max-w-[40rem] text-lg "> Female Names:</h2>
                            <p>
                            Nnassanga, Nnanteza, Nnagujja, Nnakandi, Nnabitalo, Nnamaato, Nnabatte, Nnabwato, Nnambatuusa, Nnamukina, Nakayiga, Nnabbaale, Namaanyi, Nnantambi, Nnabuule, Nnassozi , Nakate 
                            </p>
                        </div>
                        
                    </div>
                    <div className="h-[10vh]"></div>
                </div>
                
            </div>
            <Footer></Footer>
        </div>
    )
}
