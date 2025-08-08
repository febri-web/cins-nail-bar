
// admin.js - simple simulated login + read bookings
console.log('admin.js loaded');
const loginForm = document.getElementById('login-form');
const loginMsg = document.getElementById('login-msg');
const dashboard = document.getElementById('dashboard');
const loginBox = document.getElementById('loginBox');
const bookingTableBody = document.querySelector('#booking-table tbody');
const crmTableBody = document.querySelector('#crm-table tbody');

loginForm.addEventListener('submit', async function(e){
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pw = document.getElementById('password').value;
  // Simple mock login - in real use Firebase Auth
  if(email && pw){
    loginBox.style.display='none'; dashboard.style.display='block';
    loadBookings();
    loadCRM();
  } else {
    loginMsg.innerText='Login gagal';
  }
});

async function loadBookings(){
  // try firestore first
  if(typeof firebase !== 'undefined'){
    try{
      const snap = await firebase.firestore().collection('bookings').orderBy('createdAt','desc').limit(100).get();
      let total = 0; let revenue = 0;
      snap.forEach(doc => {
        const b = doc.data();
        total++;
        revenue += (b.price||0);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${b.date} ${b.time}</td><td>${b.name}</td><td>${b.service}</td><td>${b.artist}</td><td>${b.phone}</td><td>${b.status}</td>`;
        bookingTableBody.appendChild(tr);
      });
      document.getElementById('total-booking').innerText = total;
      document.getElementById('total-revenue').innerText = 'Rp ' + revenue.toLocaleString();
    }catch(e){
      console.warn('Firestore read failed',e);
    }
  } else {
    const list = JSON.parse(localStorage.getItem('cn_bookings')||'[]');
    let total=0, revenue=0;
    list.forEach(b => {
      total++; revenue += (b.price||0);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${b.date} ${b.time}</td><td>${b.name}</td><td>${b.service}</td><td>${b.artist}</td><td>${b.phone}</td><td>${b.status}</td>`;
      bookingTableBody.appendChild(tr);
    });
    document.getElementById('total-booking').innerText = total;
    document.getElementById('total-revenue').innerText = 'Rp ' + revenue.toLocaleString();
  }
}

function loadCRM(){
  // Build simple CRM summary from bookings in firestore or localStorage
  const map = {};
  const addRow = (name, phone, last, visits) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${name}</td><td>${phone}</td><td>${last}</td><td>${visits}</td>`;
    crmTableBody.appendChild(tr);
  };
  if(typeof firebase !== 'undefined'){
    firebase.firestore().collection('bookings').orderBy('createdAt','desc').limit(500).get().then(snap=>{
      snap.forEach(d=>{
        const b=d.data();
        const key=b.phone||b.name;
        if(!map[key]) map[key]={name:b.name,phone:b.phone,last:b.date,visits:0};
        map[key].visits++;
      });
      Object.values(map).forEach(v=> addRow(v.name,v.phone,v.last,v.visits));
    }).catch(e=>console.warn(e));
  }else{
    const list = JSON.parse(localStorage.getItem('cn_bookings')||'[]');
    list.forEach(b=>{
      const key=b.phone||b.name;
      if(!map[key]) map[key]={name:b.name,phone:b.phone,last:b.date,visits:0};
      map[key].visits++;
    });
    Object.values(map).forEach(v=> addRow(v.name,v.phone,v.last,v.visits));
  }
}

document.getElementById('logoutBtn').addEventListener('click', ()=>{
  dashboard.style.display='none'; loginBox.style.display='block'; bookingTableBody.innerHTML=''; crmTableBody.innerHTML='';
});
