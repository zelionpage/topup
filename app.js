const searchInput=document.getElementById("gameSearch");
const cards=[...document.querySelectorAll(".game-card")];
const chips=[...document.querySelectorAll(".chip")];
const emptyState=document.getElementById("emptyState");
let activeCategory="Semua";
function filterGames(){
  const query=(searchInput?.value||"").trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const matchName=card.dataset.name.toLowerCase().includes(query);
    const matchCategory=activeCategory==="Semua"||card.dataset.category===activeCategory;
    const show=matchName&&matchCategory;
    card.hidden=!show;
    if(show)visible++;
  });
  if(emptyState)emptyState.hidden=visible!==0;
}
searchInput?.addEventListener("input",filterGames);
chips.forEach(chip=>chip.addEventListener("click",()=>{
  activeCategory=chip.dataset.category;
  chips.forEach(item=>item.classList.toggle("active",item===chip));
  filterGames();
}));
const menuToggle=document.getElementById("menuToggle");
const mobileNav=document.getElementById("mobileNav");
menuToggle?.addEventListener("click",()=>{
  const isOpen=mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(isOpen));
  menuToggle.textContent=isOpen?"×":"☰";
});
mobileNav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  mobileNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded","false");
  if(menuToggle)menuToggle.textContent="☰";
}));
cards.forEach(card=>card.addEventListener("click",()=>{
  const game=card.dataset.name;
  const message=`Halo admin SkyGaming, saya ingin bertanya tentang top up ${game}.`;
  window.open(`https://wa.me/6287716630959?text=${encodeURIComponent(message)}`,"_blank","noopener");
}));
