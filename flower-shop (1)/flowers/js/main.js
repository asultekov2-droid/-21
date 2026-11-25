/* Каталог: фильтр и модальное окно */
const grid=document.getElementById('grid');
if(grid){
  document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    grid.querySelectorAll('.bq').forEach(c=>c.classList.toggle('d-none',f!=='Все'&&c.dataset.cat!==f));
  }));
  document.getElementById('bqModal').addEventListener('show.bs.modal',e=>{
    const d=e.relatedTarget.dataset;
    mName.textContent=d.name;mEmoji.textContent=d.emoji;mDesc.textContent=d.desc;
    mPrice.textContent=Number(d.price).toLocaleString('ru-RU')+' сом';
    mOrder.href='order.html?bouquet='+encodeURIComponent(d.name);
  });
}
/* Заказ: итог, проверка формы, окно подтверждения */
const form=document.getElementById('orderForm');
if(form){
  const sel=document.getElementById('bq'),qty=document.getElementById('qty'),date=document.getElementById('date');
  date.min=new Date().toISOString().split('T')[0];
  const pre=new URLSearchParams(location.search).get('bouquet');
  if(pre)sel.value=pre;
  const calc=()=>{
    const o=sel.selectedOptions[0];
    if(!o||!o.dataset.price){sBq.textContent='Букет не выбран';sSum.textContent='0 сом';return}
    const n=Math.max(1,+qty.value||1);
    sBq.textContent=o.value+' × '+n;
    sSum.textContent=(o.dataset.price*n).toLocaleString('ru-RU')+' сом';
  };
  sel.addEventListener('change',calc);qty.addEventListener('input',calc);calc();
  form.addEventListener('submit',e=>{
    e.preventDefault();
    form.classList.add('was-validated');
    if(!form.checkValidity())return;
    dText.textContent='Спасибо, '+document.getElementById('name').value+'! Менеджер позвонит вам на '+document.getElementById('phone').value+' для подтверждения.';
    new bootstrap.Modal(doneModal).show();
    form.reset();form.classList.remove('was-validated');calc();
  });
}