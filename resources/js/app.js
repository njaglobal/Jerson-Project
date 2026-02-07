import './bootstrap';

document.addEventListener('DOMContentLoaded', () => {

  // --- Signout Button ---
  const signoutBtn = document.getElementById('signout-btn');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', () => {
      window.location.href = window.routes?.signout || '/';
    });
  }

  // --- Mock Data ---
  const mockTests = [
    {moisture_content:6.5,weight:50.5,quality_grade:'A',oil_content:68.2,foreign_matter:1.2,test_date:new Date('2026-02-05T10:30:00'),notes:'Excellent quality batch from northern region'},
    {moisture_content:7.2,weight:45.8,quality_grade:'A',oil_content:67.5,foreign_matter:1.5,test_date:new Date('2026-02-04T14:15:00'),notes:'Good moisture level, minimal foreign matter'},
    {moisture_content:7.8,weight:52.3,quality_grade:'B',oil_content:64.3,foreign_matter:2.1,test_date:new Date('2026-02-03T09:45:00'),notes:''},
    {moisture_content:8.5,weight:48.2,quality_grade:'B',oil_content:62.8,foreign_matter:2.8,test_date:new Date('2026-02-02T11:20:00'),notes:'Acceptable quality for processing'},
    {moisture_content:9.2,weight:55.1,quality_grade:'C',oil_content:58.5,foreign_matter:4.2,test_date:new Date('2026-02-01T16:00:00'),notes:'Higher moisture content, requires attention'},
    {moisture_content:6.8,weight:47.5,quality_grade:'A',oil_content:69.1,foreign_matter:1.0,test_date:new Date('2026-01-31T13:30:00'),notes:'Premium quality'},
    {moisture_content:7.5,weight:51.2,quality_grade:'B',oil_content:65.2,foreign_matter:2.3,test_date:new Date('2026-01-30T10:15:00'),notes:''},
    {moisture_content:8.1,weight:49.8,quality_grade:'B',oil_content:63.7,foreign_matter:2.5,test_date:new Date('2026-01-28T09:20:00'),notes:'Standard batch from coastal area'},
    {moisture_content:6.9,weight:53.2,quality_grade:'A',oil_content:68.8,foreign_matter:1.3,test_date:new Date('2026-01-25T14:45:00'),notes:'High quality sample'},
    {moisture_content:7.3,weight:46.5,quality_grade:'A',oil_content:67.9,foreign_matter:1.4,test_date:new Date('2026-01-22T11:30:00'),notes:''},
    {moisture_content:8.8,weight:54.3,quality_grade:'C',oil_content:60.2,foreign_matter:3.8,test_date:new Date('2026-01-20T16:10:00'),notes:'Moderate quality'},
    {moisture_content:7.0,weight:48.9,quality_grade:'A',oil_content:68.5,foreign_matter:1.1,test_date:new Date('2026-01-18T10:00:00'),notes:'Excellent sample from premium supplier'},
    {moisture_content:9.5,weight:51.8,quality_grade:'C',oil_content:57.3,foreign_matter:4.5,test_date:new Date('2025-12-15T13:25:00'),notes:'Requires improvement'},
    {moisture_content:6.7,weight:50.1,quality_grade:'A',oil_content:69.3,foreign_matter:0.9,test_date:new Date('2025-12-10T09:15:00'),notes:'Top grade copra'},
    {moisture_content:7.6,weight:47.2,quality_grade:'B',oil_content:65.8,foreign_matter:2.0,test_date:new Date('2025-11-28T15:40:00'),notes:''},
    {moisture_content:8.3,weight:52.7,quality_grade:'B',oil_content:62.1,foreign_matter:2.9,test_date:new Date('2025-11-15T11:55:00'),notes:'Good for processing'}
  ];

  let currentPage = 1;
  let itemsPerPage = 10;
  let filteredTests = [...mockTests];

  const gradeColors = {A:'bg-green-100 text-green-800',B:'bg-blue-100 text-blue-800',C:'bg-orange-100 text-orange-800'};
  const $ = id => document.getElementById(id);
  const formatDate = date => new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(date);

  // --- Display Functions ---
  function displayStats(tests){
    const totalEl = $('total-tests'); if(totalEl) totalEl.textContent = tests.length;
    const avgMoistureEl = $('avg-moisture'); 
    if(avgMoistureEl) avgMoistureEl.textContent = (tests.reduce((sum,t)=>sum+parseFloat(t.moisture_content),0)/tests.length).toFixed(2)+'%';
    const withOil = tests.filter(t=>t.oil_content!=null);
    const avgOilEl = $('avg-oil'); 
    if(avgOilEl && withOil.length) avgOilEl.textContent = (withOil.reduce((sum,t)=>sum+parseFloat(t.oil_content),0)/withOil.length).toFixed(2)+'%';
    const lastTestEl = $('last-test'); 
    if(lastTestEl && tests.length) lastTestEl.textContent = formatDate(new Date(tests[0].test_date));
  }

  function displayRecentTests(tests){
    const container=$('tests-container');
    if(!container) return;
    container.innerHTML = tests.map(t=>{
      return `<div class="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
        <div class="flex justify-between items-start mb-2">
          <div><span class="inline-block px-3 py-1 text-xs font-semibold rounded-full ${gradeColors[t.quality_grade]||'bg-gray-100 text-gray-800'}">${t.quality_grade}</span>
          <p class="text-sm text-gray-500 mt-1">${formatDate(new Date(t.test_date))}</p></div>
          <div class="text-right"><p class="text-lg font-bold text-gray-900">${t.moisture_content}%</p><p class="text-xs text-gray-500">Moisture</p></div>
        </div>
        <div class="grid grid-cols-3 gap-2 text-sm">
          <div><p class="text-gray-500">Oil</p><p class="font-semibold">${t.oil_content||'-'}%</p></div>
          <div><p class="text-gray-500">Weight</p><p class="font-semibold">${t.weight} kg</p></div>
          <div><p class="text-gray-500">Foreign Matter</p><p class="font-semibold">${t.foreign_matter}%</p></div>
        </div>
        ${t.notes?`<p class="text-sm text-gray-600 mt-2 italic">${t.notes}</p>`:''}
      </div>`;
    }).join('');
  }

  function displayQualityDistribution(tests){
    const total = tests.length;
    const dist = {A:0,B:0,C:0};
    tests.forEach(t => dist[t.quality_grade]=(dist[t.quality_grade]||0)+1);
    const other = total - dist.A - dist.B - dist.C;

    const gradeACount = $('grade-a-count'); if(gradeACount) gradeACount.textContent = dist.A;
    const gradeABar = $('grade-a-bar'); if(gradeABar) gradeABar.style.width = (dist.A/total*100)+'%';
    const gradeBCount = $('grade-b-count'); if(gradeBCount) gradeBCount.textContent = dist.B;
    const gradeBBar = $('grade-b-bar'); if(gradeBBar) gradeBBar.style.width = (dist.B/total*100)+'%';
    const gradeCCount = $('grade-c-count'); if(gradeCCount) gradeCCount.textContent = dist.C;
    const gradeCBar = $('grade-c-bar'); if(gradeCBar) gradeCBar.style.width = (dist.C/total*100)+'%';
    const gradeOtherCount = $('grade-other-count'); if(gradeOtherCount) gradeOtherCount.textContent = other;
    const gradeOtherBar = $('grade-other-bar'); if(gradeOtherBar) gradeOtherBar.style.width = (other/total*100)+'%';
  }

  function displayHistoricalTable(tests){
    const tbody=$('table-body'); if(!tbody) return;
    tbody.innerHTML = tests.map(t=>`
      <tr class="hover:bg-gray-50">
        <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">${formatDate(new Date(t.test_date))}</td>
        <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">${t.moisture_content}%</td>
        <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">${t.oil_content||'-'}%</td>
        <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">${t.weight} kg</td>
        <td class="px-3 sm:px-6 py-3 sm:py-4"><span class="px-2 py-1 text-xs font-semibold rounded-full ${gradeColors[t.quality_grade]||'bg-gray-100 text-gray-800'}">${t.quality_grade}</span></td>
        <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">${t.foreign_matter}%</td>
        <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">${t.notes||'-'}</td>
      </tr>`).join('');
  }

  // --- Filters & Pagination ---
  function applyFilters(){
    const filter=$('filter-period')?.value||'all';
    const start=$('start-date')?.value;
    const end=$('end-date')?.value;
    const now=new Date();
    let filtered=[...mockTests];

    if(start && end){
      const s=new Date(start), e=new Date(end); e.setHours(23,59,59,999);
      filtered = filtered.filter(t=>{ const d=new Date(t.test_date); return d>=s && d<=e; });
    } else if(filter!=='all'){
      filtered = filtered.filter(t=>{
        const d=new Date(t.test_date);
        switch(filter){
          case 'today': return d.toDateString()===now.toDateString();
          case 'week': const w=new Date(now); w.setDate(w.getDate()-7); return d>=w;
          case 'month': return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
          case 'year': return d.getFullYear()===now.getFullYear();
          default: return true;
        }
      });
    }

    filteredTests = filtered;
    displayPaginatedTable();
  }

  function displayPaginatedTable(){
    const startIndex=(currentPage-1)*itemsPerPage,endIndex=startIndex+itemsPerPage;
    const paginated=filteredTests.slice(startIndex,endIndex);
    const tbody = $('table-body');
    if(tbody){
      if(paginated.length){
        displayHistoricalTable(paginated);
      } else {
        tbody.innerHTML = `<tr><td colspan="7" class="px-3 sm:px-6 py-8 sm:py-12 text-center text-gray-500 text-sm">No data found</td></tr>`;
      }
    }
    const showingFrom = $('showing-from'); if(showingFrom) showingFrom.textContent = filteredTests.length ? startIndex+1 : 0;
    const showingTo = $('showing-to'); if(showingTo) showingTo.textContent = Math.min(endIndex, filteredTests.length);
    const totalRecords = $('total-records'); if(totalRecords) totalRecords.textContent = filteredTests.length;
  }

  function initFilters(){
    ['filter-period','start-date','end-date'].forEach(id=>{
      const el = $(id);
      if(el) el.addEventListener('change',()=>{ currentPage=1; applyFilters(); });
    });

    const perPageEl = $('per-page');
    if(perPageEl) perPageEl.addEventListener('change', ()=>{
      itemsPerPage = parseInt(perPageEl.value)||10;
      currentPage=1;
      applyFilters();
    });

    const prevBtn = $('prev-page');
    if(prevBtn) prevBtn.addEventListener('click', ()=>{
      if(currentPage>1){ currentPage--; applyFilters(); }
    });

    const nextBtn = $('next-page');
    if(nextBtn) nextBtn.addEventListener('click', ()=>{
      const total=Math.ceil(filteredTests.length/itemsPerPage);
      if(currentPage<total){ currentPage++; applyFilters(); }
    });
  }

  // --- Test Form ---
  const form=$('test-form'), msg=$('success-message');
  if(form){
    const testDate = $('test-date');
    if(testDate) testDate.setAttribute('value', new Date().toISOString().slice(0,16));

    form.addEventListener('submit', e=>{
      e.preventDefault();
      if(msg){ msg.textContent='Test result saved successfully! Redirecting...'; msg.classList.remove('hidden'); }
      setTimeout(()=>{ window.location.href=window.routes?.dashboard||'/'; },1500);
    });
  }

  // --- Initialize ---
  displayStats(mockTests);
  displayRecentTests(mockTests.slice(0,5));
  displayQualityDistribution(mockTests);
  initFilters();
  applyFilters();

});

















// import './bootstrap';

// document.addEventListener('DOMContentLoaded', () => {
//   // Signout button
//   document.getElementById('signout-btn')?.addEventListener('click', () => {
//     window.location.href = window.routes?.signout || '/';
//   });

//   // Pagination & Mock Data
//   const mockTests = [
//     { moisture_content: 6.5, weight: 50.5, quality_grade: 'A', oil_content: 68.2, foreign_matter: 1.2, test_date: new Date('2026-02-05T10:30:00'), notes: 'Excellent quality batch from northern region' },
//     { moisture_content: 7.2, weight: 45.8, quality_grade: 'A', oil_content: 67.5, foreign_matter: 1.5, test_date: new Date('2026-02-04T14:15:00'), notes: 'Good moisture level, minimal foreign matter' },
//     { moisture_content: 7.8, weight: 52.3, quality_grade: 'B', oil_content: 64.3, foreign_matter: 2.1, test_date: new Date('2026-02-03T09:45:00'), notes: '' },
//     { moisture_content: 8.5, weight: 48.2, quality_grade: 'B', oil_content: 62.8, foreign_matter: 2.8, test_date: new Date('2026-02-02T11:20:00'), notes: 'Acceptable quality for processing' },
//     { moisture_content: 9.2, weight: 55.1, quality_grade: 'C', oil_content: 58.5, foreign_matter: 4.2, test_date: new Date('2026-02-01T16:00:00'), notes: 'Higher moisture content, requires attention' },
//     { moisture_content: 6.8, weight: 47.5, quality_grade: 'A', oil_content: 69.1, foreign_matter: 1.0, test_date: new Date('2026-01-31T13:30:00'), notes: 'Premium quality' },
//     { moisture_content: 7.5, weight: 51.2, quality_grade: 'B', oil_content: 65.2, foreign_matter: 2.3, test_date: new Date('2026-01-30T10:15:00'), notes: '' },
//     { moisture_content: 8.1, weight: 49.8, quality_grade: 'B', oil_content: 63.7, foreign_matter: 2.5, test_date: new Date('2026-01-28T09:20:00'), notes: 'Standard batch from coastal area' },
//     { moisture_content: 6.9, weight: 53.2, quality_grade: 'A', oil_content: 68.8, foreign_matter: 1.3, test_date: new Date('2026-01-25T14:45:00'), notes: 'High quality sample' },
//     { moisture_content: 7.3, weight: 46.5, quality_grade: 'A', oil_content: 67.9, foreign_matter: 1.4, test_date: new Date('2026-01-22T11:30:00'), notes: '' },
//     { moisture_content: 8.8, weight: 54.3, quality_grade: 'C', oil_content: 60.2, foreign_matter: 3.8, test_date: new Date('2026-01-20T16:10:00'), notes: 'Moderate quality' },
//     { moisture_content: 7.0, weight: 48.9, quality_grade: 'A', oil_content: 68.5, foreign_matter: 1.1, test_date: new Date('2026-01-18T10:00:00'), notes: 'Excellent sample from premium supplier' },
//     { moisture_content: 9.5, weight: 51.8, quality_grade: 'C', oil_content: 57.3, foreign_matter: 4.5, test_date: new Date('2025-12-15T13:25:00'), notes: 'Requires improvement' },
//     { moisture_content: 6.7, weight: 50.1, quality_grade: 'A', oil_content: 69.3, foreign_matter: 0.9, test_date: new Date('2025-12-10T09:15:00'), notes: 'Top grade copra' },
//     { moisture_content: 7.6, weight: 47.2, quality_grade: 'B', oil_content: 65.8, foreign_matter: 2.0, test_date: new Date('2025-11-28T15:40:00'), notes: '' },
//     { moisture_content: 8.3, weight: 52.7, quality_grade: 'B', oil_content: 62.1, foreign_matter: 2.9, test_date: new Date('2025-11-15T11:55:00'), notes: 'Good for processing' }
//   ];

//   let currentPage = 1;
//   let itemsPerPage = 10;
//   let filteredTests = [...mockTests];

//   // Only display stats if dashboard elements exist
//   if (document.getElementById('total-tests')) {
//     displayStats(mockTests);
//     displayRecentTests(mockTests.slice(0, 5));
//     displayQualityDistribution(mockTests);
//     initializeFilters();
//     applyFilters();
//   }

//   function displayStats(tests) {
//     const totalEl = document.getElementById('total-tests');
//     if (totalEl) totalEl.textContent = tests.length;

//     const avgMoistureEl = document.getElementById('avg-moisture');
//     if (avgMoistureEl) {
//       const avgMoisture = tests.reduce((sum, test) => sum + parseFloat(test.moisture_content), 0) / tests.length;
//       avgMoistureEl.textContent = avgMoisture.toFixed(2) + '%';
//     }

//     const avgOilEl = document.getElementById('avg-oil');
//     if (avgOilEl) {
//       const testsWithOil = tests.filter(test => test.oil_content !== null);
//       if (testsWithOil.length > 0) {
//         const avgOil = testsWithOil.reduce((sum, test) => sum + parseFloat(test.oil_content), 0) / testsWithOil.length;
//         avgOilEl.textContent = avgOil.toFixed(2) + '%';
//       }
//     }

//     const lastTestEl = document.getElementById('last-test');
//     if (lastTestEl && tests.length > 0) {
//       lastTestEl.textContent = formatDate(new Date(tests[0].test_date));
//     }
//   }

//   function displayRecentTests(tests) {
//     const container = document.getElementById('tests-container');
//     if (!container) return;

//     container.innerHTML = tests.map(test => `
//       <div class="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
//         <div class="flex justify-between items-start mb-2">
//           <div>
//             <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full ${getGradeColor(test.quality_grade)}">${test.quality_grade}</span>
//             <p class="text-sm text-gray-500 mt-1">${formatDate(new Date(test.test_date))}</p>
//           </div>
//           <div class="text-right">
//             <p class="text-lg font-bold text-gray-900">${test.moisture_content}%</p>
//             <p class="text-xs text-gray-500">Moisture</p>
//           </div>
//         </div>
//         <div class="grid grid-cols-3 gap-2 text-sm">
//           <div>
//             <p class="text-gray-500">Oil</p>
//             <p class="font-semibold">${test.oil_content || '-'}%</p>
//           </div>
//           <div>
//             <p class="text-gray-500">Weight</p>
//             <p class="font-semibold">${test.weight} kg</p>
//           </div>
//           <div>
//             <p class="text-gray-500">Foreign Matter</p>
//             <p class="font-semibold">${test.foreign_matter}%</p>
//           </div>
//         </div>
//         ${test.notes ? `<p class="text-sm text-gray-600 mt-2 italic">${test.notes}</p>` : ''}
//       </div>
//     `).join('');
//   }

//   function displayQualityDistribution(tests) {
//     const gradeAEl = document.getElementById('grade-a-count');
//     const gradeBEl = document.getElementById('grade-b-count');
//     const gradeCEl = document.getElementById('grade-c-count');
//     const gradeOtherEl = document.getElementById('grade-other-count');
//     const gradeABar = document.getElementById('grade-a-bar');
//     const gradeBBar = document.getElementById('grade-b-bar');
//     const gradeCBar = document.getElementById('grade-c-bar');
//     const gradeOtherBar = document.getElementById('grade-other-bar');

//     if (!gradeAEl) return; // Assume all grade elements exist together

//     const distribution = tests.reduce((acc, test) => {
//       const grade = test.quality_grade;
//       acc[grade] = (acc[grade] || 0) + 1;
//       return acc;
//     }, {});

//     const total = tests.length;
//     const gradeA = distribution['A'] || 0;
//     const gradeB = distribution['B'] || 0;
//     const gradeC = distribution['C'] || 0;
//     const other = total - gradeA - gradeB - gradeC;

//     gradeAEl.textContent = gradeA;
//     gradeABar.style.width = (gradeA / total * 100) + '%';
//     gradeBEl.textContent = gradeB;
//     gradeBBar.style.width = (gradeB / total * 100) + '%';
//     gradeCEl.textContent = gradeC;
//     gradeCBar.style.width = (gradeC / total * 100) + '%';
//     gradeOtherEl.textContent = other;
//     gradeOtherBar.style.width = (other / total * 100) + '%';
//   }

//   function displayHistoricalTable(tests) {
//     const tbody = document.getElementById('table-body');
//     if (!tbody) return;

//     tbody.innerHTML = tests.map(test => `
//       <tr class="hover:bg-gray-50">
//         <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">${formatDate(new Date(test.test_date))}</td>
//         <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">${test.moisture_content}%</td>
//         <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">${test.oil_content || '-'}%</td>
//         <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">${test.weight} kg</td>
//         <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
//           <span class="px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(test.quality_grade)}">${test.quality_grade}</span>
//         </td>
//         <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">${test.foreign_matter}%</td>
//         <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">${test.notes || '-'}</td>
//       </tr>
//     `).join('');
//   }

//   function getGradeColor(grade) {
//     const colors = { 'A': 'bg-green-100 text-green-800', 'B': 'bg-blue-100 text-blue-800', 'C': 'bg-orange-100 text-orange-800' };
//     return colors[grade] || 'bg-gray-100 text-gray-800';
//   }

//   function formatDate(date) {
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric', month: 'short', day: 'numeric',
//       hour: '2-digit', minute: '2-digit'
//     }).format(date);
//   }

//   // --- Filters & Pagination ---
//   function initializeFilters() {
//     const filterPeriod = document.getElementById('filter-period');
//     const startDate = document.getElementById('start-date');
//     const endDate = document.getElementById('end-date');
//     const perPage = document.getElementById('per-page');
//     const prevPage = document.getElementById('prev-page');
//     const nextPage = document.getElementById('next-page');

//     if (filterPeriod) filterPeriod.addEventListener('change', () => { currentPage = 1; applyFilters(); });
//     if (startDate) startDate.addEventListener('change', () => { currentPage = 1; applyFilters(); });
//     if (endDate) endDate.addEventListener('change', () => { currentPage = 1; applyFilters(); });
//     if (perPage) perPage.addEventListener('change', () => { itemsPerPage = parseInt(perPage.value); currentPage = 1; applyFilters(); });
//     if (prevPage) prevPage.addEventListener('click', () => { if (currentPage>1){currentPage--; applyFilters();} });
//     if (nextPage) nextPage.addEventListener('click', () => { const totalPages = Math.ceil(filteredTests.length/itemsPerPage); if(currentPage<totalPages){currentPage++; applyFilters();} });
//   }

//   function applyFilters() {
//     const filterPeriod = document.getElementById('filter-period')?.value || 'all';
//     const startDate = document.getElementById('start-date')?.value;
//     const endDate = document.getElementById('end-date')?.value;
//     const now = new Date();
//     let filtered = [...mockTests];

//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate); end.setHours(23,59,59,999);
//       filtered = filtered.filter(t => { const d = new Date(t.test_date); return d>=start && d<=end; });
//     } else if (filterPeriod !== 'all') {
//       filtered = filtered.filter(t => {
//         const d = new Date(t.test_date);
//         switch(filterPeriod){
//           case 'today': return d.toDateString()===now.toDateString();
//           case 'week': const weekAgo=new Date(now); weekAgo.setDate(weekAgo.getDate()-7); return d>=weekAgo;
//           case 'month': return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
//           case 'year': return d.getFullYear()===now.getFullYear();
//           default: return true;
//         }
//       });
//     }

//     filteredTests = filtered;
//     displayPaginatedTable();
//   }

//   function displayPaginatedTable() {
//     const startIndex = (currentPage-1)*itemsPerPage;
//     const endIndex = startIndex+itemsPerPage;
//     const paginatedTests = filteredTests.slice(startIndex,endIndex);
//     const tbody = document.getElementById('table-body');
//     if (tbody) {
//       if(paginatedTests.length===0){
//         tbody.innerHTML=`<tr><td colspan="7" class="px-3 sm:px-6 py-8 sm:py-12 text-center text-gray-500 text-sm">No data found for the selected period</td></tr>`;
//       } else displayHistoricalTable(paginatedTests);
//     }
//     document.getElementById('showing-from')?.textContent = filteredTests.length>0?startIndex+1:0;
//     document.getElementById('showing-to')?.textContent = Math.min(endIndex, filteredTests.length);
//     document.getElementById('total-records')?.textContent = filteredTests.length;
//   }

//   // --- Test Form Submission ---
//   const testForm = document.getElementById('test-form');
//   const successMessage = document.getElementById('success-message');
//   if(testForm) {
//     document.getElementById('test-date')?.setAttribute('value', new Date().toISOString().slice(0,16));
//     testForm.addEventListener('submit', (e) => {
//       e.preventDefault();
//       if(successMessage) {
//         successMessage.textContent='Test result saved successfully! Redirecting to dashboard...';
//         successMessage.classList.remove('hidden');
//       }
//       setTimeout(()=>{ window.location.href=window.routes?.dashboard||'/'; },1500);
//     });
//   }
// });


