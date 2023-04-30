

const SUPER_UNIQUE_VARIABLE = `https://webring.yesterweb.org/webring.json`;

const yesterwebTemplate = document.createElement("template");
yesterwebTemplate.innerHTML = `
<style>
.webring {
  background-image:var(--mybg);
  background-color:var(--bgcolor);
  border:var(--myborder);
  padding:var(--padding); 
  color:var(--mycolor);
  text-align: center;
  width:var(--mywidth);
  height:var(--myheight);
  border-radius:var(--borderradius);
  line-height:var(--lineheight);
}
#copy h1 {
  font-family:var(--fontfamily);
  font-size:var(--titlesize);
  line-height:20px;
  letter-spacing:2px;
  color:var(--mytitle);
  margin:var(--h1margin);
}
#copy {
font-family:var(--textfamily);
font-size:var(--textsize);
line-height:1em;
}
#copy a {
color:var(--mylinkcolor);
text-decoration:none;
}
#copy p {
margin:var(--textmargin);
}
.icon {
  font-size: 100px;
}
</style>

<div class="webring">
  <div class="icon"></div>
  <div id="copy">

  </div>
  <div class="icon"></div>
</div>`;

class YesterwebRing extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(yesterwebTemplate.content.cloneNode(true));

    // e.g. https://css-tricks.com
    const thisSite = this.getAttribute("site"); 
    
    fetch(SUPER_UNIQUE_VARIABLE)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
          (site) => site.url === thisSite
        );
        
        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length - 1) nextSiteIndex = 0;
        
        //console.log("sites[0].url is " + sites[0].url);
        //console.log("matchedSite.url is " + matchedSite.url);
        //console.log("matchedSite.name is " + matchedSite.name);
        //console.log(sites[0].url);

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `
          <h1>Yesterweb Ring</h1>
          <div class="extratext">
          <p>
            This site, <strong><a href="${matchedSite.url}"> ${matchedSite.name} </a></strong> is keeping the old web alive. <br> Thanks, <strong> ${matchedSite.owner} </strong> !
          </p>
          </div>
          <p class="nav">
            
            <a href="https://yesterweb.org/webring/">[Next]</a>
            <a href="https://yesterweb.org/webring/">[Prev]</a>
            <a href="https://yesterweb.org/webring/">[Rand]</a>
            <a href="https://yesterweb.org/webring/">[Members]</a>
          </p>
        `;

        this.shadowRoot
          .querySelector("#copy")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("webring-css", YesterwebRing);

        // Get HTML head element 
        var head = document.getElementsByTagName('HEAD')[0];  
  
        // Create new link Element 
        var link = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/css'; 
      
        link.href = 'https://yesterwebring.neocities.org/yesterweb.css';  
  
        // Append link element to HTML head 
        head.appendChild(link);  