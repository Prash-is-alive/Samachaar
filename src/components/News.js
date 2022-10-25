import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 11,
      header: this.capitalizeFirstLetter(this.props.category),
    }
    document.title = `${this.state.header} - Samachaar`
  }

  async updateNews() {
    this.setState({ loading: true })
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=343dd794e3664220a50a41979efd060e&pageSize=${this.state.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    if (parsedData.status !== "ok")
      this.setState(
        {
          articles: [
            {
              "source": {
                "id": null,
                "name": "The Siasat Daily"
              },
              "author": "Indo-Asian News Service",
              "title": "WhatsApp rolls out ‘Avatars’ to some beta testers - The Siasat Daily",
              "description": "Meta-owned messaging platform WhatsApp has rolled out customised 'Avatars' to some beta testers.",
              "url": "https://www.siasat.com/whatsapp-rolls-out-avatars-to-some-beta-testers-2440672/",
              "urlToImage": "https://cdn.siasat.com/wp-content/uploads/2022/10/afgqegqe.jpeg",
              "publishedAt": "2022-10-23T13:50:00Z",
              "content": "San Francisco: Meta-owned messaging platform WhatsApp has rolled out customised ‘Avatars’ to some beta testers.\r\nAccording to WABetaInfo, an avatar is the best way to express yourself on WhatsApp.\r\nU… [+1245 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "NDTV News"
              },
              "author": null,
              "title": "At Malaika Arora's 49th Birthday Bash, Kareena-Saif, Karisma Kapoor, Arjun Kapoor And Others Arrive In Style - NDTV Movies",
              "description": "Malaika Arora is celebrating her birthday with friends in Mumbai.",
              "url": "https://www.ndtv.com/entertainment/at-malaika-aroras-49th-birthday-bash-kareena-kapoor-seema-sajdeh-and-manish-malhotra-arrive-in-style-3457107",
              "urlToImage": "https://c.ndtvimg.com/2022-10/rpsiqvj8_q_625x300_23_October_22.jpg",
              "publishedAt": "2022-10-23T13:28:00Z",
              "content": "Malaika Arora, Arjun Kapoor and Kareena Kapoor pictured at the party venue.\r\nNew Delhi: Malaika Arora, who has turned a year older today (October 23) is celebrating her birthday with friends Kareena … [+2226 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "The Indian Express"
              },
              "author": "Science Desk",
              "title": "Space news weekly recap: Returning asteroid samples, birth of a black hole and more - The Indian Express",
              "description": "From the birth of a black hole to returning asteroid samples to Earth, read about it all in our weekly space news recap.",
              "url": "https://indianexpress.com/article/technology/science/space-news-weekly-recap-nasa-isro-black-hole-8226786/",
              "urlToImage": "https://images.indianexpress.com/2022/10/Supernova-explosion-alert-20221017.jpg",
              "publishedAt": "2022-10-23T13:20:57Z",
              "content": "Sometimes it is hard to remember that we and everyone we know live on a rock that is rapidly moving across an endless and mysterious place that we still know very little aboutspace. From a gamma-ray … [+6386 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "Hindustan Times"
              },
              "author": "HT Entertainment Desk",
              "title": "Anushka Sharma writes long note for ‘freaking beauty’ Virat Kohli after win - Hindustan Times",
              "description": "Anushka Sharma has shared a heartfelt note for husband Virat Kohli after India won the T20 World Cup match against Pakistan. | Bollywood",
              "url": "https://www.hindustantimes.com/entertainment/bollywood/anushka-sharma-writes-long-note-for-freaking-beauty-virat-kohli-after-win-101666529640917.html",
              "urlToImage": "https://images.hindustantimes.com/img/2022/10/23/1600x900/Anushka_Sharma_1663466013784_1666529811697_1666529811697.jpg",
              "publishedAt": "2022-10-23T13:05:33Z",
              "content": "Actor Anushka Sharma has penned a sweet note for husband Virat Kohli after he won India a match against Pakistan at the T20 World Cup on Sunday. An explosive half-century by Virat and a century stand… [+2122 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "Hindustan Times"
              },
              "author": "HT Tech",
              "title": "On iPhone, extract text from videos! Just try this amazing trick - HT Tech",
              "description": "Now, you can copy, translate and paste any text from a video with the help of this iPhone trick. Know the secret here.",
              "url": "https://tech.hindustantimes.com/how-to/on-iphone-extract-text-from-videos-just-try-this-amazing-trick-71666528705015.html",
              "urlToImage": "https://images.hindustantimes.com/tech/img/2022/10/23/1600x900/IMG_4236_1657625118252_1666528837172_1666528837172.jpg",
              "publishedAt": "2022-10-23T12:41:44Z",
              "content": "Did you know that you can extract text from videos as well as photos! Just like magic, thanks to the iPhone Live Text feature, you can do exactly that. It will make the photos and videos exceedingly … [+1827 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "123telugu.com"
              },
              "author": null,
              "title": "Mass working still of Prabhas released by Salaar makers - 123telugu",
              "description": "Telugu cinema news, Telugu Movies Updates, Latest Movie reviews in Telugu, Telugu cinema reviews, telugu movie reviews, Tollywood, Box office collections, Telugu Movie show times, Theater List, telugu cinema tickets",
              "url": "https://www.123telugu.com/mnews/mass-working-still-of-prabhas-released-by-salaar-makers.html",
              "urlToImage": "https://www.123telugu.com/content/wp-content/themes/123telugu/images/logo.gif",
              "publishedAt": "2022-10-23T12:04:00Z",
              "content": "PAN India star Prabhas is celebrating his birthday today. Wishes have been pouring in from the film fraternity, media, and fans. Marking this occasion, the makers of Adipurush and Project K have rele… [+975 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "NDTV News"
              },
              "author": null,
              "title": "PM Prays At Ayodhya's Ram Temple, Participates In Deepotsav Celebrations - NDTV",
              "description": "Prime Minister Narendra Modi landed in Uttar Pradesh's Ayodhya this evening to participate in Diwali celebrations. PM Modi offered prayers at the Ram temple. He will review temple construction work later and see cultural shows.",
              "url": "https://www.ndtv.com/india-news/pm-offers-prayers-at-ayodhyas-ram-temple-will-participate-in-deepotsav-celebrations-3457067",
              "urlToImage": "https://c.ndtvimg.com/2022-10/kkd2m34o_modi-ayodhya-puja_650x400_23_October_22.jpg",
              "publishedAt": "2022-10-23T11:39:00Z",
              "content": "<li>He performed a symbolic coronation of Lord Ram at the temple town.\r\n</li><li>PM Modi will see an \"aarti\" on the banks of the River Saryu, followed by launch of the Deepotsav celebrations, the sta… [+1399 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "Www.bgr.in"
              },
              "author": "Pranav Sawant",
              "title": "Flipkart Big Diwali Sale ends today: Best phone deals in the last few hours - BGR India",
              "description": "The Flipkart Big Diwali sale is ending today and those who are yet to purchase electronics like smartphones should hurry up. To simplify your decision, we are listing some of the hand-picked deals for the phones in the sale.",
              "url": "https://www.bgr.in/photo-gallery/flipkart-big-diwali-sale-ends-today-1335110/",
              "urlToImage": "https://st1.bgr.in/wp-content/uploads/2022/10/Flipkart-Big-Diwali-Sale-2022-1.jpg",
              "publishedAt": "2022-10-23T11:19:05Z",
              "content": "BGR.in\r\n (Broad Guidance &amp; Ratings) is a leading online destination for all things technology including news related to smartphones, smart TVs, smartwatches, TWS earbuds, latest games and apps, a… [+261 chars]"
            },
            {
              "source": {
                "id": "google-news",
                "name": "Google News"
              },
              "author": null,
              "title": "US woman sues L'Oreal, says hair products tied to cancer - India",
              "description": null,
              "url": "https://news.google.com/__i/rss/rd/articles/CBMiZ2h0dHBzOi8vaW4uZmFzaGlvbm5ldHdvcmsuY29tL25ld3MvVXMtd29tYW4tc3Vlcy1sLW9yZWFsLXNheXMtaGFpci1wcm9kdWN0cy10aWVkLXRvLWNhbmNlciwxNDUxNDkzLmh0bWzSAQA?oc=5",
              "urlToImage": null,
              "publishedAt": "2022-10-23T11:08:25Z",
              "content": null
            },
            {
              "source": {
                "id": null,
                "name": "Livemint"
              },
              "author": "Pooja Sitaram Jaiswar",
              "title": "Muhurat trading: Three multibagger stocks are hot picks this Diwali; gains over 130-235% in 2 years | Mint - Mint",
              "description": "Among these three stocks, two are from the banking basket while the other is from the heavy electrical equipment industry. These stocks have the potential to give between 22-38% gains going forward.",
              "url": "https://www.livemint.com/market/stock-market-news/muhurat-trading-three-multibagger-stocks-are-hot-picks-this-diwali-gains-over-130-235-in-2-years-11666520122419.html",
              "urlToImage": "https://images.livemint.com/img/2022/10/23/600x338/BSE-stock-exchange_1666504706205_1666521331985_1666521331985.jpg",
              "publishedAt": "2022-10-23T10:36:33Z",
              "content": "Investors across India are keenly waiting for the auspicious one-hour trading on Monday due to the occasion of Lakshmi Pujan aka Main Diwali. Bets on key stocks will be placed for future gains. Inves… [+5008 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "ReliefWeb"
              },
              "author": null,
              "title": "World Polio Day 2022 and beyond: a healthier future for mothers and children in Somalia - Somalia - ReliefWeb",
              "description": "News and Press Release in English on Somalia about Health and Epidemic; published on 23 Oct 2022 by WHO",
              "url": "https://reliefweb.int/report/somalia/world-polio-day-2022-and-beyond-healthier-future-mothers-and-children-somalia",
              "urlToImage": "https://reliefweb.int/modules/custom/reliefweb_meta/images/disaster-type/EP.png",
              "publishedAt": "2022-10-23T10:33:27Z",
              "content": "Mogadishu, 24 October 2022 – Living by its principle of ‘delivering on a promise’, WHO and the Government of Somalia are commemorating the World Polio Day by launching fifth round of this year’s sub-… [+4764 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "Livemint"
              },
              "author": "Livemint",
              "title": "Indian-origin Rishi Sunak confirms he's running to replace Liz Truss as UK PM - Mint",
              "description": "Indian-origin Rishi Sunak has confirmed that he's running to replace Liz Truss as the United Kingdom prime minister",
              "url": "https://www.livemint.com/news/indianorigin-rishi-sunak-confirms-he-s-running-to-replace-liz-truss-11666518447950.html",
              "urlToImage": "https://images.livemint.com/img/2022/10/23/600x338/BRITAIN-POLITICS--2_1666518499080_1666518499080_1666518522999_1666518522999.JPG",
              "publishedAt": "2022-10-23T09:49:26Z",
              "content": "British Conservative MP and former United Kingdom Finance Minister Rishi Sunak announced on Sunday that he is running to replace outgoing Prime Minister Liz Truss. This makes it his second bid in mon… [+1869 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "Free Press Journal"
              },
              "author": "FPJ Web Desk",
              "title": "Apple increases the cost of iPad Mini and iPad Air 2022 in India - Free Press Journal",
              "description": "",
              "url": "https://www.freepressjournal.in/tech/apple-increases-the-cost-of-ipad-mini-and-ipad-air-2022-in-india",
              "urlToImage": "https://gumlet.assettype.com/freepressjournal/2022-10/8b271147-d7e7-4c7c-8e3a-e0710b3a5257/new_design__227ki0c376am_large.png?rect=0%2C0%2C3900%2C2048&w=1200&auto=format%2Ccompress&ogImage=true",
              "publishedAt": "2022-10-23T09:18:27Z",
              "content": "Apple has raised the price of the iPad mini 6th Gen and iPad Air 2022 in India after the launch of its 10th Gen iPad and iPad Pro 2022. This is the second price raise by the tech giant this month. Ea… [+1645 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "Moneycontrol"
              },
              "author": "Rakesh Patil",
              "title": "24 midcap stocks beat market downturn with 10-215% surge - Moneycontrol",
              "description": "In Samvat 2078, the BSE smallcap index fell 1.16 percent, the midcap index slipped 4.5 percent and the largecap index skidded 1 percent",
              "url": "https://www.moneycontrol.com/news/business/markets/market-ends-lower-in-samvat-2078-but-these-24-midcaps-gain-10-215-9375411.html",
              "urlToImage": "https://images.moneycontrol.com/static-mcnews/2020/01/Sensex_BSE_NSE_Stock-market_bull_bear_Gold-3-770x433.png",
              "publishedAt": "2022-10-23T09:16:00Z",
              "content": "The Indian equity market regained momentum and rose more than 2 percent in the week ended October 21, supported by positive global cues, healthy earnings, slower selling by foreign institutional inve… [+5611 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "NDTV News"
              },
              "author": null,
              "title": "Moonlighting Unacceptable, \"Few\" Employees Fired Over It: IT Firm - NDTV Profit",
              "description": "IT company Happiest Minds Technologies has said moonlighting is unacceptable as it amounts to violation of job contract and that \"few\" employees found engaging in such practices have been fired over the last 6-12 months.",
              "url": "https://www.ndtv.com/business/moonlighting-unacceptable-few-employees-fired-over-it-happiest-minds-3456554",
              "urlToImage": "https://i.ndtvimg.com/i/2017-06/it-sector_650x400_71498458027.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=675?ver-20220723.02",
              "publishedAt": "2022-10-23T08:35:00Z",
              "content": "Several firms have waded into the issue making it clear that they do not approve of it.(Representational)\r\nNew Delhi: IT company Happiest Minds Technologies has said moonlighting is unacceptable as i… [+4665 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "The Indian Express"
              },
              "author": "Sports Desk",
              "title": "India vs Pakistan Live Cricket Score, T20 World Cup 2022: Arshdeep dismisses Babar & Rizwan in powerplay - The Indian Express",
              "description": "T20 World Cup 2022, India vs Pakistan Live Scorecard, Star Sports Network, Disney + Hotstar Live: India take on Pakistan.",
              "url": "https://indianexpress.com/article/sports/cricket/india-vs-pakistan-live-cricket-score-t20-world-cup-2022-8225814/",
              "urlToImage": "https://images.indianexpress.com/2022/10/India-vs-Pakistan-T20-World-Cup-2022-IND-vs-PAK-India-Pakistan.jpeg",
              "publishedAt": "2022-10-23T08:29:16Z",
              "content": "Sandip G: Everyone roared. The bowler, the captain, the ex-captain, the vice-captain and the multitudes in the gallery. As soon as the umpire lifted his index finger skywards, Arshdeep Sing, his pear… [+731 chars]"
            },
            {
              "source": {
                "id": "al-jazeera-english",
                "name": "Al Jazeera English"
              },
              "author": "Al Jazeera",
              "title": "India rocket puts 36 internet satellites into orbit - Al Jazeera English",
              "description": "The mission was part of a commercial arrangement between a government-run firm and UK-based OneWeb satellite firm.",
              "url": "https://www.aljazeera.com/news/2022/10/23/india-launches-into-orbit-36-internet-satellites",
              "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2022/10/AP22295694768411.jpg?resize=1920%2C1440",
              "publishedAt": "2022-10-23T08:25:23Z",
              "content": "Indias space agency says its rocket has successfully put 36 internet satellites into orbit for UK-based satellite company OneWeb after months of delay due to the war in Ukraine.\r\nThe mission part of … [+1813 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "News18"
              },
              "author": "News Desk",
              "title": "VIDEO | Karnataka Minister Slaps Woman at Public Event, She then Touches his Feet; Cong Wants Action - News18",
              "description": "The minister was attending an event Saturday at Hangala village in Gundlupet where 173 beneficiaries were handed out land title deeds",
              "url": "https://www.news18.com/news/politics/watch-bjp-minister-slaps-woman-at-event-to-distribute-land-title-deeds-in-karnataka-6226333.html",
              "urlToImage": "https://images.news18.com/ibnlive/uploads/2022/10/karnataka-166650940116x9.jpg",
              "publishedAt": "2022-10-23T07:20:00Z",
              "content": "A Karnataka minister is under fire after a video of him slapping a woman at a public event to distribute land titles in the states Chamarajanagar district surfaced on Saturday.\r\nHousing Minister of K… [+2600 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "Crictracker.com"
              },
              "author": "Pranchal Srivastava",
              "title": "T20 World Cup 2022: Match 15 - Predicted Ireland Playing XI vs Sri Lanka - CricTracker",
              "description": "After performing well in the First Round of the  T20 World Cup 2022, team Ireland will take on Sri Lanka in their first Super 12 encounter to be played at the Bellerive Oval in Hobart on October",
              "url": "https://www.crictracker.com/cricket-match-predictions/t20-world-cup-2022-match-15-predicted-ireland-playing-xi-vs-sri-lanka/",
              "urlToImage": "https://media.crictracker.com/media/attachments/1666337851102_WI-VS-IRE.jpeg",
              "publishedAt": "2022-10-23T06:46:10Z",
              "content": "After performing well in the First Round of the  T20 World Cup2022, team Ireland will take on Sri Lanka in their first Super 12 encounter to be played at the Bellerive Oval in Hobart on October 23 (S… [+3610 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "Hindustan Times"
              },
              "author": "Sharmita Kar",
              "title": "Cyclone Sitrang: Storm to intensify in next 12 hours, heavy rain in these states - Hindustan Times",
              "description": "Cyclone warning: Several areas in Bengal and Odisha are expected to receive heavy to very heavy rainfall on Monday and Tuesday as cyclonic storm ‘Sitrang’ prepares for landfall. | Kolkata News",
              "url": "https://www.hindustantimes.com/cities/kolkata-news/cyclone-sitrang-may-intensify-in-next-12-hours-towards-bay-of-bengal-imd-101666504241023.html",
              "urlToImage": "https://images.hindustantimes.com/img/2022/10/23/1600x900/PTI05-10-2022-000160A-0_1652242266391_1666507398113_1666507398113.jpg",
              "publishedAt": "2022-10-23T06:44:47Z",
              "content": "Cyclonic storm Sitrang is very likely to move north-westwards in the next 12 hours and intensify over the Bay of Bengal, the India Meteorological Department said in its latest bulletin. According to … [+1474 chars]"
            }
          ]
        }
      )
  }

  async componentDidMount() {
    this.updateNews()
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  }
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <>
        <h1 className='text-center heading my-5' >SAMACHAAR - {this.state.header}</h1>
        {this.state.loading && <Spinner />}
        <div className='container d-flex justify-content-around flex-wrap align-items-center'>
          {!this.state.loading && this.state.articles.map((ele) => {
            return <div key={ele.url}>
              <NewsItem imgUrl={ele.urlToImage} title={ele.title} desc={ele.description} url={ele.url} author={ele.author} publishedAt={ele.publishedAt} name={ele.source.name} />
            </div>
          })}
        </div>
        <div className=' d-flex justify-content-between m-4'>
          <button type="button" className="btn btn-primary" title='Previous' disabled={this.state.page <= 1 ? true : false} onClick={this.handlePrevClick}>&larr;</button>
          <button type="button" className="btn btn-primary" title='Next' disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) ? true : false} onClick={this.handleNextClick}>&rarr;</button>
        </div>

      </>
    )
  }
}

export default News