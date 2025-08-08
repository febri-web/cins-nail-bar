
// booking.js - handles booking form and saves to Firestore (compat)
console.log('booking.js loaded');

// Firebase app & firestore assumed initialized in firebase-config-sample.js as "firebaseApp" and "db"
function initFirebaseCheck(){
  if(typeof firebase === 'undefined'){
    console.warn('Firebase not loaded. Booking will use localStorage fallback.');
    return false;
  }
  return true;
}

document.getElementById('booking-form').addEventListener('submit', async function(e){
  e.preventDefault();
  const ok = initFirebaseCheck();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const serviceRaw = document.getElementById('service').value;
  const artist = document.getElementById('artist').value;
  const notes = document.getElementById('notes').value;
  if(!name || !phone || !date || !time || !serviceRaw){ alert('Mohon lengkapi form'); return; }
  const [service, price] = serviceRaw.split('|');
  const booking = {
    name, phone, date, time, service, price: Number(price||0), artist, notes,
    status: 'scheduled', createdAt: new Date().toISOString()
  };
  if(ok){
    try{
      const res = await firebase.firestore().collection('bookings').add(booking);
      document.getElementById('booking-msg').innerText = 'Booking berhasil terkirim! Terima kasih.';
      document.getElementById('booking-form').reset();
    }catch(err){
      console.error(err);
      document.getElementById('booking-msg').innerText = 'Gagal mengirim booking (firestore).';
    }
  }else{
    // fallback store in localStorage
    const list = JSON.parse(localStorage.getItem('cn_bookings')||'[]');
    list.push(booking);
    localStorage.setItem('cn_bookings', JSON.stringify(list));
    document.getElementById('booking-msg').innerText = 'Booking disimpan secara lokal (demo).';
    document.getElementById('booking-form').reset();
  }
});
