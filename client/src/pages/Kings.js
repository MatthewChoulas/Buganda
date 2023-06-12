import React from 'react'
import {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import KingProfile from '../components/KingProfile'

export default function Kings() {

    const kingsData = [
        {
            name: "Muwenda Mutebi II",
            year: "1993 - Present",
            photo:"https://pbs.twimg.com/media/DjcGqfKWsAA-pMr.jpg",
            description:"Muwenda Mutebi II became the king of Buganda following the restoration of the kingdom, and he continues to serve as the current ruler. His reign has been marked by efforts to preserve Buganda's cultural heritage and promote development within the region."
        },
        {
            name: "Edward Muteesa II",
            year: "1939 - 1969",
            photo:"https://www.buganda.or.ug/uploads/kings/large/34.jpg",
            description:"Mutesa II played a crucial role in the decolonization and independence movement of Uganda. He became the first President of Uganda after independence, but his reign was cut short by political turmoil."
        },
        {
            name: "Daudi Chwa II",
            year: "1898 - 1939",
            photo:"https://www.buganda.or.ug/uploads/kings/large/33.jpg",
            description:"Daudi Chwa II's reign witnessed increased British influence and colonization, leading to significant changes in the political and social structure of Buganda."
        },
        {
            name: "Daniel Mwanga II",
            year: "1889 - 1897",
            photo:"https://www.buganda.or.ug/uploads/kings/large/30.jpg",
            description:"Mwanga II's reign was tumultuous, marked by conflicts with both internal factions and European colonial powers, particularly during the events of the Buganda Crisis and the religious wars."
        },
        {
            name: "Kalema Rashid",
            year: "1888 - 1889",
            photo:"https://www.buganda.or.ug/uploads/kings/large/32.jpg",
            description:"Kalema also served as a regent during a transitional period for Buganda."
        },
        {
            name: "Kiweewa Mutebi I",
            year: "1888 - 1888",
            photo:"https://www.buganda.or.ug/uploads/kings/large/31.jpg",
            description:"Kiweewa's reign was short, and he served as a regent during a time of political uncertainty."
        },
        {
            name: "Muteesa I",
            year: "1856 - 1884",
            photo:"https://www.buganda.or.ug/uploads/kings/large/30a.jpg",
            description:"Muteesa I was a significant figure in Buganda's history, as he dealt with the increasing influence of European powers, including signing treaties with them."
        },
        {
            name: "Ssuuna II",
            year: "1824 - 1856",
            photo:"https://www.buganda.or.ug/uploads/kings/large/29.jpg",
            description:"Suuna II's reign saw increased European contact and the beginning of the challenges posed by colonial powers."
        },
        {
            name: "Kamaanya",
            year: "1814 - 1832",
            photo:"https://www.buganda.or.ug/uploads/kings/large/28.jpg",
            description:"Kamaanya's reign marked a period of relative peace and cultural preservation in Buganda."
        },
        {
            name: "Ssemakookiro",
            year: "1797 - 1814",
            photo:"https://www.buganda.or.ug/uploads/kings/large/27.jpg",
            description:""
        },
        {
            name: "Kabaka Kyabaggu",
            year: "1750 - 1780",
            photo:"https://www.buganda.or.ug/uploads/kings/large/25a.jpg",
            description:"Kyabaggu's rule was characterized by efforts to centralize power and strengthen the administration of Buganda."
        },
        {
            name: "Namugala",
            year: "1740 - 1750",
            photo:"https://www.buganda.or.ug/uploads/kings/large/25.jpg",
            description:"Namuggala's reign saw periods of stability and consolidation within the Buganda kingdom."
        },
        {
            name: "Mawanda",
            year: "1730 - 1740",
            photo:"https://www.buganda.or.ug/uploads/kings/large/23.jpg",
            description:"Mawanda's reign was marked by internal conflicts and challenges to the authority of the Buganda kingdom."
        },
        {
            name: "Kikulwe",
            year: "1720 - 1730            ",
            photo:"https://www.buganda.or.ug/uploads/kings/large/22.jpg",
            description:"Kikulwe's reign was short-lived, and historical records provide limited information about his rule and achievements."
        },
        {
            name: "Tebuchwereke",
            year: "1710 - 1720",
            photo:"https://www.buganda.or.ug/uploads/kings/large/21.jpg",
            description:""
        },
        {
            name: "Ndawula",
            year: "1700 - 1710",
            photo:"https://www.buganda.or.ug/uploads/kings/large/20.jpg",
            description:"Ndawula's reign was marked by conflicts with neighboring kingdoms, particularly Bunyoro."
        },
        {
            name: "Tebandeke",
            year: "1690 - 1700",
            photo:"https://www.buganda.or.ug/uploads/kings/large/19.jpg",
            description:"Tebandeke's reign was characterized by diplomatic efforts and consolidation of Buganda's power."
        },
        {
            name: "Kayemba",
            year: "1682 - 1690",
            photo:"https://www.buganda.or.ug/uploads/kings/large/18.jpg",
            description:"Kayemba's reign witnessed significant achievements in military campaigns and expansion."
        },
        {
            name: "Jjuuko",
            year: "1670 - 1682",
            photo:"https://www.buganda.or.ug/uploads/kings/large/17.jpg",
            description:"Juuko's reign marked a period of political and territorial stability for Buganda."
        },
        {
            name: "Mutebi I",
            year: "1650 - 1670",
            photo:"https://www.buganda.or.ug/uploads/kings/large/16.jpg",
            description:"Mutebi I's reign was relatively brief, and not much information is available about his rule."
        },
        {
            name: "Kateregga",
            year: "1610 - 1650",
            photo:"https://www.buganda.or.ug/uploads/kings/large/15.jpg",
            description:"Kateregga's reign is associated with territorial expansion and strengthening of Buganda's political influence."
        },
        {
            name: "Kimbungwe",
            year: "1590 - 1610",
            photo:"https://www.buganda.or.ug/uploads/kings/large/14.jpg",
            description:"Kimbugwe's reign witnessed conflicts with neighboring kingdoms and challenges to Buganda's authority."
        },
        {
            name: "Ssekamaanya",
            year: "1550 - 1590",
            photo:"https://www.buganda.or.ug/uploads/kings/large/13.jpg",
            description:"Notable achievements during Sekamaanya's reign include the establishment of various administrative institutions."
        },
        {
            name: "Ssuuna I",
            year: "1530 - 1550",
            photo:"https://www.buganda.or.ug/uploads/kings/large/12.jpg",
            description:"Suuna I's reign saw the consolidation of Buganda's power and the solidification of its cultural identity."
        },
        {
            name: "Jjemba",
            year: "1510 - 1530",
            photo:"https://www.buganda.or.ug/uploads/kings/large/11.jpg",
            description:"Jemba's reign coincided with political and territorial expansion for Buganda."
        },
        {
            name: "Mulondo",
            year: "1490 - 1510",
            photo:"https://www.buganda.or.ug/uploads/kings/large/10.jpg",
            description:"Mulondo's reign was relatively short, and not much is known about his accomplishments."
        },
        {
            name: "Nnakibinge",
            year: "1440 - 1490",
            photo:"https://www.buganda.or.ug/uploads/kings/large/9.jpg",
            description:"Nakibinge ruled Buganda during an era of relative peace and prosperity."
        },
        {
            name: "Kayima",
            year: "1415 - 1440",
            photo:"https://www.buganda.or.ug/uploads/kings/large/8.jpg",
            description:"Kayima's reign marked a period of stability following the abdications of Kiggala."
        },
        {
            name: "Kiggala Mukaabya",
            year: "1400 - 1415",
            photo:"https://www.buganda.or.ug/uploads/kings/large/6.jpg",
            description:"Kiggala twice abdicated the throne during his reign, indicating a period of political instability."
        },
        {
            name: "Kiyimba",
            year: "1380 - 1400",
            photo:"https://www.buganda.or.ug/uploads/kings/large/7.jpg",
            description:"Not much information is available about Kiyimba's reign."
        },
        {
            name: "Ttembo",
            year: "1330 - 1360",
            photo:"https://www.buganda.or.ug/uploads/kings/large/4.jpg",
            description:"Ttembo is credited with establishing the capital at Ntinda Hill, a strategic location for the kingdom."
        },
        {
            name: "Kimera",
            year: "1275 - 1330",
            photo:"https://www.buganda.or.ug/uploads/kings/large/3.jpg",
            description:"Considered the \"True\" founder of the dynasty, Kimera had a significant influence on Buganda culture during his reign."
        },
        {
            name: "Chwa Nabakka",
            year: "1230 - 127",
            photo:"https://www.buganda.or.ug/uploads/kings/large/2.jpg",
            description:"Chwa I is known for establishing Bigo Hill, an important cultural and administrative center in Buganda."
        },
        {
            name: "Kintu",
            year: "1200 - 1230",
            photo:"https://www.buganda.or.ug/uploads/kings/large/1.jpg",
            description:"Kato Kintu is considered the First King of Buganda, laying the foundation for the kingdom. Not much is known about his reign."
        },
    ]

    return (
        <div> 
            <div className=" w-screen bg-gray-100 w-max-screen flex flex-col">
                <Navbar></Navbar>
                    <div className="flex w-screen items-center h-40 md:px-32 md:py-12 px-10 py-4 bg-gray-600">
                    <p className="text-4xl font-semibold text-white">Bassekabaka - Past Kings</p> 
                    </div> 
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6 md:my-20 px-10 py-4">
                        {kingsData.map((data) => <KingProfile {...data}/>)}    
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
