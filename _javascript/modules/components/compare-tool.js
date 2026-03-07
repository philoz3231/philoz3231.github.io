/**
 * Compare Tool Component
 * AP와 디바이스를 비교하는 툴
 */

export function initCompareTool() {
  console.log('initCompareTool 호출됨');
  
  // DOM이 준비될 때까지 대기
  if (document.readyState === 'loading') {
    console.log('DOM 로딩 중, DOMContentLoaded 대기');
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded 발생, initCompareTool 재실행');
      initCompareTool();
    });
    return;
  }

  console.log('DOM 준비 완료, 요소 찾기 시작');
  const compareBtn = document.getElementById('compare-btn');
  const clearBtn = document.getElementById('clear-btn');
  const compareResults = document.getElementById('compare-results');
  const selectedItemsTags = document.getElementById('selected-items-tags');

  if (!compareBtn || !clearBtn || !selectedItemsTags) {
    console.warn('비교 툴 요소를 찾을 수 없습니다.');
    return;
  }

  console.log('비교 툴 초기화 시작');

  let apData = [];
  let deviceData = [];
  let selectedItems = [];
  let charts = [];
  let dataLoaded = false;
  let currentMainCategory = null; // 현재 선택된 대분류

  function parseNumeric(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value === 'number') {
      return Number.isNaN(value) ? null : value;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  function parseListOrScalar(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value !== 'string') {
      return value;
    }

    const items = value
      .split('|')
      .map(item => item.trim())
      .filter(Boolean)
      .map(item => {
        const parsed = parseNumeric(item);
        return parsed ?? item;
      });

    if (items.length === 0) {
      return null;
    }

    return items.length === 1 ? items[0] : items;
  }

  function normalizeString(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    return value;
  }

  function parseDeviceRow(row) {
    if (!row || typeof row !== 'object') {
      return row;
    }

    if ('display' in row || !('display_size' in row)) {
      return row;
    }

    return {
      id: row.id,
      name: row.name,
      type: row.type,
      manufacturer: row.manufacturer,
      category: row.category,
      release_date: normalizeString(row.release_date),
      price: parseNumeric(row.price),
      price_unit: normalizeString(row.price_unit),
      cpu: normalizeString(row.cpu),
      gpu: normalizeString(row.gpu),
      os: normalizeString(row.os),
      memory: parseListOrScalar(row.memory),
      memory_unit: normalizeString(row.memory_unit),
      storage: parseListOrScalar(row.storage),
      storage_unit: normalizeString(row.storage_unit),
      display: {
        size: parseNumeric(row.display_size),
        unit: normalizeString(row.display_unit),
        resolution: normalizeString(row.display_resolution),
        type: normalizeString(row.display_type),
        refresh_rate: parseNumeric(row.display_refresh_rate),
        refresh_rate_unit: normalizeString(row.display_refresh_rate_unit)
      },
      battery: {
        capacity: parseNumeric(row.battery_capacity),
        unit: normalizeString(row.battery_unit),
        charging: normalizeString(row.battery_charging)
      },
      charging: {
        wired_max: parseNumeric(row.charging_wired_max),
        wired_unit: normalizeString(row.charging_wired_unit),
        wireless_max: parseNumeric(row.charging_wireless_max),
        wireless_unit: normalizeString(row.charging_wireless_unit)
      },
      camera: {
        rear: normalizeString(row.camera_rear),
        front: normalizeString(row.camera_front)
      },
      connectivity: {
        bluetooth: normalizeString(row.connectivity_bluetooth),
        wifi: normalizeString(row.connectivity_wifi),
        cellular: normalizeString(row.connectivity_cellular)
      },
      weight: parseNumeric(row.weight),
      weight_unit: normalizeString(row.weight_unit),
      dimensions: normalizeString(row.dimensions),
      benchmarks: {
        geekbench: {
          single: parseNumeric(row.benchmarks_geekbench_single),
          multi: parseNumeric(row.benchmarks_geekbench_multi)
        },
        '3dmark_wild_life_extreme': parseNumeric(
          row.benchmarks_3dmark_wild_life_extreme
        )
      }
    };
  }

  // 데이터 로드
  function loadData() {
    const dataScript = document.getElementById('compare-data');
    if (!dataScript) {
      console.error('비교 데이터 스크립트를 찾을 수 없습니다.');
      return;
    }

    try {
      const scriptContent = dataScript.textContent.trim();
      if (!scriptContent) {
        console.error('데이터 스크립트가 비어있습니다.');
        return;
      }

      const data = JSON.parse(scriptContent);
      apData = Array.isArray(data.aps) ? data.aps : [];
      deviceData = Array.isArray(data.devices)
        ? data.devices.map(parseDeviceRow)
        : [];
      dataLoaded = true;
      
      console.log('데이터 로드 완료:', { 
        aps: apData.length, 
        devices: deviceData.length
      });
    } catch (error) {
      console.error('데이터 파싱 실패:', error);
      dataLoaded = false;
    }
  }

  // AP 필터링 (중분류: 제조사)
  function filterAPsByManufacturer(manufacturer) {
    return apData.filter(ap => ap.manufacturer === manufacturer);
  }

  // AP 필터링 (제조사 + class)
  function filterAPsByManufacturerAndClass(manufacturer, apClass) {
    return apData.filter(ap => 
      ap.manufacturer === manufacturer && 
      ap.classes && 
      Array.isArray(ap.classes) && 
      ap.classes.includes(apClass)
    );
  }

  // 실제 존재하는 AP 제조사 목록 가져오기
  function getAPManufacturers() {
    const manufacturers = new Set();
    apData.forEach(ap => {
      if (ap.manufacturer) {
        manufacturers.add(ap.manufacturer);
      }
    });
    return Array.from(manufacturers).sort();
  }

  // 디바이스 필터링 (중분류: 제조사, 소분류: 카테고리)
  function filterDevicesByCategory(manufacturer, subcategory) {
    return deviceData.filter(device => 
      device.manufacturer === manufacturer && 
      device.category === subcategory
    );
  }

  // 실제 존재하는 디바이스 제조사 목록 가져오기
  function getDeviceManufacturers() {
    const manufacturers = new Set();
    deviceData.forEach(device => {
      if (device.manufacturer) {
        manufacturers.add(device.manufacturer);
      }
    });
    return Array.from(manufacturers).sort();
  }

  // 태그 생성
  function createTag(item) {
    const tag = document.createElement('div');
    tag.className = 'item-tag';
    tag.dataset.itemId = item.id;
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'tag-name';
    nameSpan.textContent = item.name;
    
    const removeBtn = document.createElement('span');
    removeBtn.className = 'tag-remove';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeItem(item.id);
    });
    
    tag.appendChild(nameSpan);
    tag.appendChild(removeBtn);
    
    return tag;
  }


  // 항목 제거
  function removeItem(itemId) {
    selectedItems = selectedItems.filter(item => item.id !== itemId);
    
    const tag = selectedItemsTags.querySelector(`[data-item-id="${itemId}"]`);
    if (tag) {
      tag.remove();
    }

    // 체크박스 해제 (일반 목록)
    const checkbox = document.getElementById(`item-${itemId}`);
    if (checkbox) {
      checkbox.checked = false;
    }

    // 팝업 내 체크박스 해제
    const popupCheckbox = document.getElementById(`popup-item-${itemId}`);
    if (popupCheckbox) {
      popupCheckbox.checked = false;
    }

    // 모든 항목 제거 시 대분류 초기화
    if (selectedItems.length === 0) {
      currentMainCategory = null;
      const placeholder = document.createElement('p');
      placeholder.className = 'text-muted mb-0';
      placeholder.textContent = '분류를 선택하여 항목을 추가하세요';
      selectedItemsTags.appendChild(placeholder);
    }

    updateCompareButton();
  }

  // 비교 버튼 상태 업데이트
  function updateCompareButton() {
    compareBtn.disabled = selectedItems.length < 2;
    clearBtn.disabled = selectedItems.length === 0 && 
      (!compareResults.style.display || compareResults.style.display === 'none');
  }

  // 비교 실행
  function performCompare() {
    if (selectedItems.length < 2) {
      alert('최소 2개 이상의 항목을 선택해주세요.');
      return;
    }

    renderBenchmarks();
    renderComparisonTable();
    compareResults.style.display = 'block';
    clearBtn.disabled = false;
  }

  // 비교 표 렌더링
  function renderComparisonTable() {
    const tableHead = document.getElementById('compare-table-head');
    const tableBody = document.getElementById('compare-table-body');
    
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (selectedItems.length === 0) return;

    const isAP = currentMainCategory === 'ap';
    const specs = isAP ? getAPSpecs() : getDeviceSpecs();

    // 헤더 생성
    const headerRow = document.createElement('tr');
    const specHeader = document.createElement('th');
    specHeader.textContent = '스펙';
    specHeader.scope = 'col';
    headerRow.appendChild(specHeader);

    selectedItems.forEach(item => {
      const th = document.createElement('th');
      th.textContent = item.name;
      th.scope = 'col';
      headerRow.appendChild(th);
    });

    tableHead.appendChild(headerRow);

    // 바디 생성
    specs.forEach(spec => {
      const row = document.createElement('tr');
      const specCell = document.createElement('td');
      specCell.textContent = spec.label;
      specCell.className = 'spec-label';
      row.appendChild(specCell);

      selectedItems.forEach(item => {
        const cell = document.createElement('td');
        const value = getSpecValue(item, spec.key);
        cell.textContent = value !== null && value !== undefined ? value : '-';
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  }

  // AP 스펙 목록
  function getAPSpecs() {
    return [
      { key: 'cores.total', label: '총 코어 수' },
      { key: 'cores.performance', label: '성능 코어' },
      { key: 'cores.efficiency', label: '효율 코어' },
      { key: 'clock_speed.base', label: '기본 클럭' },
      { key: 'clock_speed.boost', label: '부스트 클럭' },
      { key: 'process', label: '제조 공정' },
      { key: 'cache.l3', label: 'L3 캐시' },
      { key: 'tdp', label: 'TDP' },
      { key: 'release_date', label: '출시일' },
      { key: 'architecture', label: '아키텍처' },
      { key: 'gpu_cores', label: 'GPU' },
      { key: 'neural_engine', label: 'Neural Engine' },
      { key: 'max_memory', label: '최대 메모리' },
      { key: 'price', label: '가격' }
    ];
  }

  // 기기 스펙 목록
  function getDeviceSpecs() {
    return [
      { key: 'release_date', label: '출시일' },
      { key: 'price', label: '가격' },
      { key: 'cpu', label: 'CPU' },
      { key: 'gpu', label: 'GPU' },
      { key: 'memory', label: '메모리' },
      { key: 'storage', label: '저장공간' },
      { key: 'display.size', label: '화면 크기' },
      { key: 'display.resolution', label: '해상도' },
      { key: 'display.type', label: '화면 타입' },
      { key: 'display.refresh_rate', label: '주사율' },
      { key: 'battery.capacity', label: '배터리' },
      { key: 'charging.wired_max', label: '유선 충전 속도' },
      { key: 'charging.wireless_max', label: '무선 충전 속도' },
      { key: 'camera.rear', label: '후면 카메라' },
      { key: 'camera.front', label: '전면 카메라' },
      { key: 'connectivity.bluetooth', label: 'Bluetooth' },
      { key: 'connectivity.wifi', label: 'Wi-Fi' },
      { key: 'connectivity.cellular', label: 'Cellular' },
      { key: 'weight', label: '무게' },
      { key: 'dimensions', label: '크기' }
    ];
  }

  // 스펙 값 가져오기 (중첩된 키 지원)
  function getSpecValue(item, key) {
    const keys = key.split('.');
    let value = item;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return null;
      }
    }

    // 배열인 경우 처리 (storage, memory 등)
    if (Array.isArray(value)) {
      if (value.length === 0) return null;
      const lastKey = keys[keys.length - 1];
      let unit = null;
      if (keys.length > 1) {
        let parent = item;
        for (let i = 0; i < keys.length - 1; i++) {
          if (parent && typeof parent === 'object' && keys[i] in parent) {
            const nextParent = parent[keys[i]];
            if (i === keys.length - 2 && nextParent && typeof nextParent === 'object') {
              unit = nextParent[lastKey + '_unit'] || nextParent.unit;
            }
            parent = nextParent;
          }
        }
      } else {
        unit = item[lastKey + '_unit'] || item.unit;
      }
      const unitStr = unit ? ` ${unit}` : '';
      return value.map(v => `${v}${unitStr}`).join(', ');
    }

    // 단위 추가
    const lastKey = keys[keys.length - 1];
    let unit = null;
    
    if (keys.length > 1) {
      let parent = item;
      for (let i = 0; i < keys.length - 1; i++) {
        if (parent && typeof parent === 'object' && keys[i] in parent) {
          parent = parent[keys[i]];
        } else {
          parent = null;
          break;
        }
      }
      if (parent && typeof parent === 'object') {
        unit = parent[lastKey + '_unit'] || parent.unit;
      }
    } else {
      unit = item[lastKey + '_unit'] || item.unit;
    }

    if (value !== null && value !== undefined) {
      // 가격 포맷팅
      if (key === 'price' && typeof value === 'number') {
        const priceUnit = item.price_unit || 'KRW';
        return `${value.toLocaleString()} ${priceUnit}`;
      }
      
      // 충전 속도 포맷팅
      if (key === 'charging.wired_max' || key === 'charging.wireless_max') {
        const chargingParent = keys.length > 1 ? (item.charging || {}) : {};
        const chargingUnit = key === 'charging.wired_max' 
          ? (chargingParent.wired_unit || 'W')
          : (chargingParent.wireless_unit || 'W');
        if (typeof value === 'number') {
          return `${value} ${chargingUnit}`;
        }
        return value ? `${value} ${chargingUnit}` : '-';
      }
      
      if (typeof value === 'number') {
        return unit ? `${value} ${unit}` : value.toString();
      }
      if (typeof value === 'string' && value.length > 0) {
        return unit ? `${value} ${unit}` : value;
      }
      return value;
    }

    return null;
  }

  // 벤치마크 렌더링
  function renderBenchmarks() {
    const container = document.getElementById('benchmarks-container');
    if (!container) return;
    
    container.innerHTML = '';

    if (selectedItems.length === 0) return;

    // Single core 기준으로 정렬
    const sortedItems = [...selectedItems].sort((a, b) => {
      const aScore = a.benchmarks?.geekbench?.single || 0;
      const bScore = b.benchmarks?.geekbench?.single || 0;
      return aScore - bScore;
    });

    // AP 벤치마크
    if (currentMainCategory === 'ap') {
      renderAPBenchmarks(container, sortedItems);
    } else {
      // Device 벤치마크
      renderDeviceBenchmarks(container, sortedItems);
    }
  }

  // AP 벤치마크 렌더링
  function renderAPBenchmarks(container, sortedItems) {
    // Geekbench Single
    const geekbenchSingle = sortedItems.map(item => ({
      name: item.name,
      score: item.benchmarks?.geekbench?.single || 0
    }));
    if (geekbenchSingle.some(item => item.score > 0)) {
      renderBenchmarkSection(container, 'Geekbench Single-Core Score', geekbenchSingle);
    }

    // Geekbench Multi
    const geekbenchMulti = sortedItems.map(item => ({
      name: item.name,
      score: item.benchmarks?.geekbench?.multi || 0
    }));
    if (geekbenchMulti.some(item => item.score > 0)) {
      renderBenchmarkSection(container, 'Geekbench Multi-Core Score', geekbenchMulti);
    }

    // Cinebench Single
    const cinebenchSingle = sortedItems.map(item => ({
      name: item.name,
      score: item.benchmarks?.cinebench?.single || 0
    }));
    if (cinebenchSingle.some(item => item.score > 0)) {
      renderBenchmarkSection(container, 'Cinebench Single-Core Score', cinebenchSingle);
    }

    // Cinebench Multi
    const cinebenchMulti = sortedItems.map(item => ({
      name: item.name,
      score: item.benchmarks?.cinebench?.multi || 0
    }));
    if (cinebenchMulti.some(item => item.score > 0)) {
      renderBenchmarkSection(container, 'Cinebench Multi-Core Score', cinebenchMulti);
    }
  }

  // Device 벤치마크 렌더링
  function renderDeviceBenchmarks(container, sortedItems) {
    // Geekbench Single
    const geekbenchSingle = sortedItems.map(item => ({
      name: item.name,
      score: item.benchmarks?.geekbench?.single || 0
    }));
    if (geekbenchSingle.some(item => item.score > 0)) {
      renderBenchmarkSection(container, 'Geekbench Single-Core Score', geekbenchSingle);
    }

    // Geekbench Multi
    const geekbenchMulti = sortedItems.map(item => ({
      name: item.name,
      score: item.benchmarks?.geekbench?.multi || 0
    }));
    if (geekbenchMulti.some(item => item.score > 0)) {
      renderBenchmarkSection(container, 'Geekbench Multi-Core Score', geekbenchMulti);
    }

    // 3DMark Wild Life Extreme
    const mark3d = sortedItems.map(item => ({
      name: item.name,
      score: item.benchmarks?.['3dmark_wild_life_extreme'] || 0
    }));
    if (mark3d.some(item => item.score > 0)) {
      renderBenchmarkSection(container, '3DMark Wild Life Extreme', mark3d);
    }
  }

  // 벤치마크 섹션 렌더링
  function renderBenchmarkSection(container, title, items) {
    const section = document.createElement('div');
    section.className = 'benchmark-section mb-4';
    
    const titleEl = document.createElement('h4');
    titleEl.className = 'mb-3';
    titleEl.textContent = title;
    section.appendChild(titleEl);

    // 최저 점수와 최대 점수 찾기
    const validScores = items.map(item => item.score).filter(score => score > 0);
    const minScore = Math.min(...validScores);
    const maxScore = Math.max(...validScores);
    const maxPercentage = (maxScore / minScore) * 100;
    
    // 가장 긴 제품명 길이 계산 (고정 너비 설정용)
    const maxNameLength = Math.max(...items.map(item => item.name.length));
    const nameWidth = Math.max(120, maxNameLength * 8); // 최소 120px, 글자당 약 8px
    
    // 아이템별 색상 배열
    const colors = [
      '#4ECDC4', // 민트
      '#6c757d', // 회색
      '#3498db', // 파란색
      '#e74c3c', // 빨간색
      '#f39c12', // 주황색
      '#9b59b6', // 보라색
      '#1abc9c', // 청록색
      '#e67e22', // 갈색
      '#34495e', // 어두운 회색
      '#16a085'  // 진한 청록색
    ];
    
    // 각 제품을 세로로 나열
    items.forEach((item, index) => {
      if (item.score <= 0) return;
      
      const itemContainer = document.createElement('div');
      itemContainer.className = 'benchmark-item mb-2';
      
      const percentage = (item.score / minScore) * 100;
      
      // 제품명과 점수 표시
      const labelContainer = document.createElement('div');
      labelContainer.style.display = 'flex';
      labelContainer.style.alignItems = 'center';
      labelContainer.style.marginBottom = '0.25rem';
      
      const nameSpan = document.createElement('span');
      nameSpan.textContent = item.name;
      nameSpan.style.fontWeight = '500';
      nameSpan.style.marginRight = '0.5rem';
      nameSpan.style.width = `${nameWidth}px`;
      nameSpan.style.flexShrink = '0';
      labelContainer.appendChild(nameSpan);
      
      // 가로 막대 (모든 막대가 같은 컨테이너 너비 사용)
      const barContainer = document.createElement('div');
      barContainer.style.position = 'relative';
      barContainer.style.flex = '1';
      barContainer.style.height = '32px';
      barContainer.style.backgroundColor = 'transparent';
      barContainer.style.borderRadius = '4px';
      barContainer.style.overflow = 'visible';
      
      const bar = document.createElement('div');
      bar.style.position = 'absolute';
      bar.style.left = '0';
      bar.style.top = '0';
      bar.style.height = '100%';
      // 최대 퍼센트를 기준으로 정규화하여 모든 막대가 같은 시작점에서 시작하도록
      bar.style.width = `${(percentage / maxPercentage) * 100}%`;
      const barColor = colors[index % colors.length];
      bar.style.backgroundColor = barColor;
      bar.style.transition = 'width 0.3s ease';
      bar.style.borderRadius = '4px';
      
      // 점수와 퍼센트 텍스트
      const textSpan = document.createElement('span');
      textSpan.style.position = 'absolute';
      textSpan.style.left = '8px';
      textSpan.style.top = '50%';
      textSpan.style.transform = 'translateY(-50%)';
      // 색상에 따라 텍스트 색상 조정 (밝은 색상은 어두운 텍스트, 어두운 색상은 밝은 텍스트)
      const isLightColor = ['#4ECDC4', '#3498db', '#1abc9c', '#16a085', '#f39c12', '#e67e22'].includes(barColor);
      textSpan.style.color = isLightColor ? '#333' : '#fff';
      textSpan.style.fontSize = '0.875rem';
      textSpan.style.fontWeight = '500';
      textSpan.style.zIndex = '1';
      textSpan.textContent = `${item.score.toLocaleString()} (${percentage.toFixed(1)}%)`;
      
      barContainer.appendChild(bar);
      barContainer.appendChild(textSpan);
      labelContainer.appendChild(barContainer);
      
      itemContainer.appendChild(labelContainer);
      section.appendChild(itemContainer);
    });
    
    container.appendChild(section);
  }

  // 차트 렌더링
  function renderCharts() {
    const container = document.getElementById('chart-container');
    container.innerHTML = '';

    charts.forEach(chart => {
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    charts = [];

    if (currentMainCategory === 'ap') {
      renderAPCharts(container);
    } else {
      renderDeviceCharts(container);
    }
  }

  // AP 차트 렌더링
  function renderAPCharts(container) {
    if (typeof Chart === 'undefined') {
      container.innerHTML = '<p class="text-muted">차트 라이브러리를 불러오는 중...</p>';
      loadChartJS().then(() => {
        renderAPCharts(container);
      });
      return;
    }

    // 코어 수 비교 차트
    const coresCanvas = document.createElement('canvas');
    coresCanvas.id = 'cores-chart';
    container.appendChild(coresCanvas);

    const coresCtx = coresCanvas.getContext('2d');
    const coresChart = new Chart(coresCtx, {
      type: 'bar',
      data: {
        labels: selectedItems.map(item => item.name),
        datasets: [
          {
            label: '성능 코어',
            data: selectedItems.map(item => item.cores?.performance || 0),
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          },
          {
            label: '효율 코어',
            data: selectedItems.map(item => item.cores?.efficiency || 0),
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '코어 수 비교'
          },
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    charts.push(coresChart);

    // 클럭 속도 비교 차트
    const clockCanvas = document.createElement('canvas');
    clockCanvas.id = 'clock-chart';
    clockCanvas.style.marginTop = '2rem';
    container.appendChild(clockCanvas);

    const clockCtx = clockCanvas.getContext('2d');
    const clockChart = new Chart(clockCtx, {
      type: 'bar',
      data: {
        labels: selectedItems.map(item => item.name),
        datasets: [
          {
            label: '기본 클럭 (GHz)',
            data: selectedItems.map(item => item.clock_speed?.base || 0),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          },
          {
            label: '부스트 클럭 (GHz)',
            data: selectedItems.map(item => item.clock_speed?.boost || 0),
            backgroundColor: 'rgba(255, 159, 64, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '클럭 속도 비교'
          },
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    charts.push(clockChart);
  }

  // 기기 차트 렌더링
  function renderDeviceCharts(container) {
    if (typeof Chart === 'undefined') {
      container.innerHTML = '<p class="text-muted">차트 라이브러리를 불러오는 중...</p>';
      loadChartJS().then(() => {
        renderDeviceCharts(container);
      });
      return;
    }

    // 화면 크기 비교
    const displayCanvas = document.createElement('canvas');
    displayCanvas.id = 'display-chart';
    container.appendChild(displayCanvas);

    const displayCtx = displayCanvas.getContext('2d');
    const displayChart = new Chart(displayCtx, {
      type: 'bar',
      data: {
        labels: selectedItems.map(item => item.name),
        datasets: [{
          label: `화면 크기 (${selectedItems[0]?.display?.unit || 'inch'})`,
          data: selectedItems.map(item => item.display?.size || 0),
          backgroundColor: 'rgba(153, 102, 255, 0.6)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '화면 크기 비교'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    charts.push(displayChart);

    // 배터리 용량 비교
    const batteryCanvas = document.createElement('canvas');
    batteryCanvas.id = 'battery-chart';
    batteryCanvas.style.marginTop = '2rem';
    container.appendChild(batteryCanvas);

    const batteryCtx = batteryCanvas.getContext('2d');
    const batteryChart = new Chart(batteryCtx, {
      type: 'bar',
      data: {
        labels: selectedItems.map(item => item.name),
        datasets: [{
          label: `배터리 용량 (${selectedItems[0]?.battery?.unit || 'mAh'})`,
          data: selectedItems.map(item => item.battery?.capacity || 0),
          backgroundColor: 'rgba(255, 206, 86, 0.6)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '배터리 용량 비교'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    charts.push(batteryChart);
  }

  // Chart.js 로드
  function loadChartJS() {
    return new Promise((resolve, reject) => {
      if (typeof Chart !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // 초기화
  function clearComparison() {
    selectedItems = [];
    currentMainCategory = null;
    compareResults.style.display = 'none';
    
    selectedItemsTags.innerHTML = '<p class="text-muted mb-0">분류를 선택하여 항목을 추가하세요</p>';
    
    // 컬럼 초기화
    document.querySelectorAll('.category-column-main .category-item').forEach(item => {
      item.classList.remove('active');
    });
    const subcategoryColumn = document.getElementById('subcategory-column');
    const itemsColumn = document.getElementById('items-column');
    subcategoryColumn.style.display = 'flex'; // 초기 상태에서는 표시
    itemsColumn.style.display = 'flex'; // 초기 상태에서는 표시
    subcategoryColumn.innerHTML = '<p class="category-placeholder">대분류를 선택하세요</p>';
    itemsColumn.innerHTML = '<p class="category-placeholder">중분류를 선택하세요</p>';
    document.getElementById('item-list-column').innerHTML = '<p class="category-placeholder">소분류를 선택하세요</p>';
    
    // 체크박스 모두 해제
    document.querySelectorAll('.item-checkbox input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    charts.forEach(chart => {
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    charts = [];
    
    updateCompareButton();
  }

  // 대분류 호버 처리
  function handleMainCategoryHover(category) {
    const subcategoryColumn = document.getElementById('subcategory-column');
    const itemsColumn = document.getElementById('items-column');

    if (category === 'ap') {
      // AP는 중분류 컬럼 표시 (실제 존재하는 제조사만)
      subcategoryColumn.style.display = 'flex';
      subcategoryColumn.innerHTML = '';
      
      // items-column도 표시 (class를 표시하기 위해)
      itemsColumn.style.display = 'flex';
      itemsColumn.innerHTML = '<p class="category-placeholder">제조사를 선택하세요</p>';
      
      // 실제 데이터에서 존재하는 제조사만 가져오기
      const manufacturers = getAPManufacturers();
      
      if (manufacturers.length > 0) {
        manufacturers.forEach(manufacturer => {
          const item = document.createElement('div');
          item.className = 'category-item';
          item.dataset.category = 'ap';
          item.dataset.manufacturer = manufacturer;
          item.innerHTML = `<span class="category-name">${manufacturer}</span>`;
          item.addEventListener('mouseenter', () => handleSubCategoryHover(category, manufacturer));
          item.addEventListener('click', () => handleSubCategoryClick(category, manufacturer));
          subcategoryColumn.appendChild(item);
        });
      } else {
        subcategoryColumn.innerHTML = '<p class="category-placeholder">항목이 없습니다</p>';
      }
      
      document.getElementById('item-list-column').innerHTML = '<p class="category-placeholder">클래스를 선택하세요</p>';
    } else if (category === 'device') {
      // 디바이스는 중분류 컬럼 표시 (실제 존재하는 제조사만)
      subcategoryColumn.style.display = 'flex';
      subcategoryColumn.innerHTML = '';
      
      // items-column도 표시
      itemsColumn.style.display = 'flex';
      itemsColumn.innerHTML = '<p class="category-placeholder">중분류를 선택하세요</p>';
      
      // 실제 데이터에서 존재하는 제조사만 가져오기
      const manufacturers = getDeviceManufacturers();
      
      if (manufacturers.length > 0) {
        manufacturers.forEach(manufacturer => {
          const item = document.createElement('div');
          item.className = 'category-item';
          item.dataset.category = 'device';
          item.dataset.manufacturer = manufacturer;
          item.innerHTML = `<span class="category-name">${manufacturer}</span>`;
          item.addEventListener('mouseenter', () => handleSubCategoryHover(category, manufacturer));
          item.addEventListener('click', () => handleSubCategoryClick(category, manufacturer));
          subcategoryColumn.appendChild(item);
        });
      } else {
        subcategoryColumn.innerHTML = '<p class="category-placeholder">항목이 없습니다</p>';
      }
      
      document.getElementById('item-list-column').innerHTML = '<p class="category-placeholder">소분류를 선택하세요</p>';
    }
  }

  // 대분류 클릭 처리
  function handleMainCategoryClick(category) {
    // 대분류 활성화
    document.querySelectorAll('.category-column-main .category-item').forEach(item => {
      item.classList.remove('active');
    });
    const clickedItem = document.querySelector(`.category-column-main .category-item[data-category="${category}"]`);
    if (clickedItem) {
      clickedItem.classList.add('active');
    }

    // 호버 처리와 동일하게 하위 항목 표시
    handleMainCategoryHover(category);
  }

  // 중분류 호버 처리
  function handleSubCategoryHover(category, manufacturer) {
    const itemsColumn = document.getElementById('items-column');
    const itemListColumn = document.getElementById('item-list-column');

    if (category === 'ap') {
      // AP는 class를 소분류로 표시
      itemsColumn.style.display = 'flex';
      itemsColumn.innerHTML = '';
      itemListColumn.innerHTML = '<p class="category-placeholder">클래스를 선택하세요</p>';
      
      // 해당 제조사의 AP들을 가져와서 class 목록 추출
      const items = filterAPsByManufacturer(manufacturer);
      const classSet = new Set();
      
      items.forEach(item => {
        if (item.classes && Array.isArray(item.classes)) {
          item.classes.forEach(cls => classSet.add(cls));
        }
      });
      
      const classes = Array.from(classSet).sort();
      const classLabels = {
        'mobile-class': 'Mobile',
        'laptop-class': 'Laptop',
        'desktop-class': 'Desktop'
      };
      const classTdpRanges = {
        'mobile-class': '~10W',
        'laptop-class': '10~35W',
        'desktop-class': '35W+'
      };
      
      if (classes.length > 0) {
        classes.forEach(cls => {
          const item = document.createElement('div');
          item.className = 'category-item';
          item.dataset.category = 'ap';
          item.dataset.manufacturer = manufacturer;
          item.dataset.apClass = cls;
          item.innerHTML = `
            <span class="category-name">${classLabels[cls] || cls}</span>
            <span class="category-tdp-range">${classTdpRanges[cls] || ''}</span>
          `;
          item.addEventListener('mouseenter', () => handleAPClassHover(category, manufacturer, cls));
          item.addEventListener('click', () => handleAPClassClick(category, manufacturer, cls));
          itemsColumn.appendChild(item);
        });
      } else {
        itemsColumn.innerHTML = '<p class="category-placeholder">클래스 정보가 없습니다</p>';
      }
    } else if (category === 'device') {
      // 디바이스는 소분류 표시 (하위에 아이템이 있는 경우에만)
      // 아이템 목록 컬럼 초기화 (이전 호버에서 표시된 아이템 제거)
      itemListColumn.innerHTML = '<p class="category-placeholder">소분류를 선택하세요</p>';
      
      itemsColumn.innerHTML = '';
      const subcategories = [
        { value: 'smartphone', label: '스마트폰' },
        { value: 'tablet', label: '태블릿' },
        { value: 'laptop', label: '노트북' }
      ];
      subcategories.forEach(sub => {
        // 해당 소분류에 아이템이 있는지 확인
        const items = filterDevicesByCategory(manufacturer, sub.value);
        if (items.length > 0) {
          const item = document.createElement('div');
          item.className = 'category-item';
          item.dataset.category = 'device';
          item.dataset.manufacturer = manufacturer;
          item.dataset.subcategory = sub.value;
          item.innerHTML = `<span class="category-name">${sub.label}</span>`;
          item.addEventListener('mouseenter', () => handleTertiaryCategoryHover(category, manufacturer, sub.value, item));
          item.addEventListener('click', () => handleTertiaryCategoryClick(category, manufacturer, sub.value));
          itemsColumn.appendChild(item);
        }
      });
      
      // 아이템이 하나도 없는 경우
      if (itemsColumn.children.length === 0) {
        itemsColumn.innerHTML = '<p class="category-placeholder">해당 제조사의 항목이 없습니다</p>';
      }
    }
  }

  // 중분류 클릭 처리
  function handleSubCategoryClick(category, manufacturer) {
    // 중분류 활성화
    document.querySelectorAll('#subcategory-column .category-item').forEach(item => {
      item.classList.remove('active');
    });
    const clickedItem = document.querySelector(`#subcategory-column .category-item[data-manufacturer="${manufacturer}"]`);
    if (clickedItem) {
      clickedItem.classList.add('active');
    }

    // 호버 처리와 동일하게 하위 항목 표시
    handleSubCategoryHover(category, manufacturer);
  }

  // AP class 호버 처리 - 아이템 목록 컬럼 표시
  function handleAPClassHover(category, manufacturer, apClass) {
    const items = filterAPsByManufacturerAndClass(manufacturer, apClass);
    showItemListInColumn(items, category);
  }

  // AP class 클릭 처리
  function handleAPClassClick(category, manufacturer, apClass) {
    // class 활성화
    document.querySelectorAll('#items-column .category-item').forEach(item => {
      item.classList.remove('active');
    });
    const clickedItem = document.querySelector(`#items-column .category-item[data-ap-class="${apClass}"]`);
    if (clickedItem) {
      clickedItem.classList.add('active');
    }

    // 클릭 시 아이템 목록 컬럼에 표시 (고정)
    const items = filterAPsByManufacturerAndClass(manufacturer, apClass);
    showItemListInColumn(items, category);
  }

  // 소분류 호버 처리 (디바이스만) - 아이템 목록 컬럼 표시
  function handleTertiaryCategoryHover(category, manufacturer, subcategory) {
    const items = filterDevicesByCategory(manufacturer, subcategory);
    showItemListInColumn(items, category);
  }

  // 소분류 클릭 처리 (디바이스만)
  function handleTertiaryCategoryClick(category, manufacturer, subcategory) {
    // 소분류 활성화
    document.querySelectorAll('#items-column .category-item').forEach(item => {
      item.classList.remove('active');
    });
    const clickedItem = document.querySelector(`#items-column .category-item[data-subcategory="${subcategory}"]`);
    if (clickedItem) {
      clickedItem.classList.add('active');
    }

    // 클릭 시 아이템 목록 컬럼에 표시 (고정)
    const items = filterDevicesByCategory(manufacturer, subcategory);
    showItemListInColumn(items, category);
  }

  // 아이템 목록을 컬럼에 표시 (소분류 하위)
  function showItemListInColumn(items, mainCategory) {
    const itemListColumn = document.getElementById('item-list-column');
    
    if (items.length === 0) {
      itemListColumn.innerHTML = '<p class="category-placeholder">해당 분류에 항목이 없습니다</p>';
      return;
    }

    const itemList = document.createElement('div');
    itemList.className = 'item-list';

    items.forEach(item => {
      const checkboxDiv = document.createElement('div');
      checkboxDiv.className = 'item-checkbox';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `item-${item.id}`;
      checkbox.value = item.id;
      checkbox.checked = selectedItems.some(selected => selected.id === item.id);
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          addItem(item, mainCategory);
        } else {
          removeItem(item.id);
        }
      });

      const label = document.createElement('label');
      label.htmlFor = `item-${item.id}`;
      label.textContent = item.name;

      checkboxDiv.appendChild(checkbox);
      checkboxDiv.appendChild(label);
      itemList.appendChild(checkboxDiv);
    });

    itemListColumn.innerHTML = '';
    itemListColumn.appendChild(itemList);
  }

  // 아이템 목록 표시 (AP의 경우 오른쪽 컬럼에 직접 표시)
  function showItemList(items, mainCategory) {
    const itemsColumn = document.getElementById('items-column');
    
    if (items.length === 0) {
      itemsColumn.innerHTML = '<p class="category-placeholder">해당 분류에 항목이 없습니다</p>';
      return;
    }

    const itemList = document.createElement('div');
    itemList.className = 'item-list';

    items.forEach(item => {
      const checkboxDiv = document.createElement('div');
      checkboxDiv.className = 'item-checkbox';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `item-${item.id}`;
      checkbox.value = item.id;
      checkbox.checked = selectedItems.some(selected => selected.id === item.id);
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          addItem(item, mainCategory);
        } else {
          removeItem(item.id);
        }
      });

      const label = document.createElement('label');
      label.htmlFor = `item-${item.id}`;
      label.textContent = item.name;

      checkboxDiv.appendChild(checkbox);
      checkboxDiv.appendChild(label);
      itemList.appendChild(checkboxDiv);
    });

    itemsColumn.innerHTML = '';
    itemsColumn.appendChild(itemList);
  }

  // 단일 항목 추가
  function addItem(item, mainCategory) {
    // 대분류 검증
    if (currentMainCategory && currentMainCategory !== mainCategory) {
      if (confirm('같은 대분류(AP 또는 디바이스)의 항목만 비교할 수 있습니다.\n기존 선택을 초기화하고 새로 선택하시겠습니까?')) {
        clearComparison();
        currentMainCategory = mainCategory;
      } else {
        // 체크박스 해제
        const checkbox = document.getElementById(`item-${item.id}`);
        if (checkbox) {
          checkbox.checked = false;
        }
        return;
      }
    }

    // 첫 선택 시 대분류 설정
    if (!currentMainCategory) {
      currentMainCategory = mainCategory;
    }

    // 중복 체크
    if (selectedItems.find(selected => selected.id === item.id)) {
      return;
    }

    // 기존 안내 메시지 제거
    const placeholder = selectedItemsTags.querySelector('p.text-muted');
    if (placeholder) {
      placeholder.remove();
    }

    selectedItems.push(item);
    const tag = createTag(item);
    selectedItemsTags.appendChild(tag);

    updateCompareButton();
  }

  // 이벤트 리스너
  console.log('이벤트 리스너 등록 중');
  compareBtn.addEventListener('click', performCompare);
  clearBtn.addEventListener('click', clearComparison);

  // 대분류 호버 및 클릭 이벤트
  document.querySelectorAll('.category-column-main .category-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const category = item.dataset.category;
      handleMainCategoryHover(category);
    });
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      handleMainCategoryClick(category);
    });
  });

  // 데이터 로드 및 초기화
  console.log('데이터 로드 시작');
  loadData();
  console.log('비교 툴 초기화 완료');
}
