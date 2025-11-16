/**
 * Compare Tool Component
 * CPU와 기기를 비교하는 툴
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
  const compareTypeSelect = document.getElementById('compare-type');
  const compareItemsSelect = document.getElementById('compare-items');
  const compareBtn = document.getElementById('compare-btn');
  const clearBtn = document.getElementById('clear-btn');
  const compareResults = document.getElementById('compare-results');

  console.log('요소 찾기 결과:', {
    compareTypeSelect: !!compareTypeSelect,
    compareItemsSelect: !!compareItemsSelect,
    compareBtn: !!compareBtn,
    clearBtn: !!clearBtn,
    compareResults: !!compareResults
  });

  if (!compareTypeSelect || !compareItemsSelect || !compareBtn) {
    console.warn('비교 툴 요소를 찾을 수 없습니다. 페이지에 비교 툴이 없거나 아직 로드되지 않았습니다.');
    return; // 페이지에 비교 툴이 없으면 종료
  }

  console.log('비교 툴 초기화 시작');

  let cpuData = [];
  let deviceData = [];
  let selectedItems = [];
  let charts = [];

  // 데이터 로드
  function loadData() {
    // Jekyll이 페이지에 포함시킨 데이터에서 로드
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
      cpuData = Array.isArray(data.cpus) ? data.cpus : [];
      deviceData = Array.isArray(data.devices) ? data.devices : [];
      
      console.log('데이터 로드 완료:', { 
        cpus: cpuData.length, 
        devices: deviceData.length,
        sampleCpu: cpuData[0],
        sampleDevice: deviceData[0]
      });
    } catch (error) {
      console.error('데이터 파싱 실패:', error);
      console.error('데이터 스크립트 내용 (처음 500자):', dataScript.textContent.substring(0, 500));
    }
  }

  // 타입 선택 시 항목 목록 업데이트
  function updateItemsList() {
    const selectedType = compareTypeSelect.value;
    compareItemsSelect.innerHTML = '';
    compareItemsSelect.disabled = !selectedType;

    if (!selectedType) {
      compareItemsSelect.innerHTML = '<option value="">먼저 타입을 선택하세요</option>';
      compareBtn.disabled = true;
      return;
    }

    const items = selectedType === 'cpu' ? cpuData : deviceData;
    
    console.log('항목 목록 업데이트:', { type: selectedType, itemsCount: items.length, items });
    
    if (items.length === 0) {
      compareItemsSelect.innerHTML = '<option value="">데이터를 불러올 수 없습니다</option>';
      console.warn('데이터가 비어있습니다:', { cpuData, deviceData });
      return;
    }

    items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      compareItemsSelect.appendChild(option);
    });

    updateCompareButton();
  }

  // 비교 버튼 상태 업데이트
  function updateCompareButton() {
    const selectedItems = Array.from(compareItemsSelect.selectedOptions);
    compareBtn.disabled = selectedItems.length < 2;
    clearBtn.disabled = selectedItems.length === 0 && !compareResults.style.display || compareResults.style.display === 'none';
  }

  // 비교 실행
  function performCompare() {
    const selectedType = compareTypeSelect.value;
    const selectedOptions = Array.from(compareItemsSelect.selectedOptions);
    
    if (selectedOptions.length < 2) {
      alert('최소 2개 이상의 항목을 선택해주세요.');
      return;
    }

    const items = selectedType === 'cpu' ? cpuData : deviceData;
    selectedItems = selectedOptions.map(option => {
      return items.find(item => item.id === option.value);
    }).filter(item => item !== undefined);

    if (selectedItems.length < 2) {
      alert('선택한 항목을 찾을 수 없습니다.');
      return;
    }

    renderComparisonTable();
    renderCharts();
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

    const selectedType = compareTypeSelect.value;
    const specs = selectedType === 'cpu' ? getCPUSpecs() : getDeviceSpecs();

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

  // CPU 스펙 목록
  function getCPUSpecs() {
    return [
      { key: 'manufacturer', label: '제조사' },
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
      { key: 'max_memory', label: '최대 메모리' }
    ];
  }

  // 기기 스펙 목록
  function getDeviceSpecs() {
    return [
      { key: 'manufacturer', label: '제조사' },
      { key: 'category', label: '카테고리' },
      { key: 'display.size', label: '화면 크기' },
      { key: 'display.resolution', label: '해상도' },
      { key: 'display.type', label: '화면 타입' },
      { key: 'display.refresh_rate', label: '주사율' },
      { key: 'battery.capacity', label: '배터리' },
      { key: 'memory', label: '메모리' },
      { key: 'storage', label: '저장공간' },
      { key: 'cpu', label: 'CPU' },
      { key: 'gpu', label: 'GPU' },
      { key: 'camera.rear', label: '후면 카메라' },
      { key: 'camera.front', label: '전면 카메라' },
      { key: 'os', label: '운영체제' },
      { key: 'weight', label: '무게' },
      { key: 'dimensions', label: '크기' },
      { key: 'release_date', label: '출시일' }
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
      // 단위 찾기
      const lastKey = keys[keys.length - 1];
      let unit = null;
      if (keys.length > 1) {
        const parent = item;
        for (let i = 0; i < keys.length - 1; i++) {
          if (parent && typeof parent === 'object' && keys[i] in parent) {
            const nextParent = parent[keys[i]];
            if (i === keys.length - 2 && nextParent && typeof nextParent === 'object') {
              unit = nextParent[lastKey + '_unit'] || nextParent.unit;
            }
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
      // 중첩된 객체에서 단위 찾기
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

  // 차트 렌더링
  function renderCharts() {
    const container = document.getElementById('chart-container');
    container.innerHTML = '';

    // 기존 차트 제거
    charts.forEach(chart => {
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    charts = [];

    const selectedType = compareTypeSelect.value;
    
    if (selectedType === 'cpu') {
      renderCPUCharts(container);
    } else {
      renderDeviceCharts(container);
    }
  }

  // CPU 차트 렌더링
  function renderCPUCharts(container) {
    // Chart.js가 로드되었는지 확인
    if (typeof Chart === 'undefined') {
      container.innerHTML = '<p class="text-muted">차트 라이브러리를 불러오는 중...</p>';
      // Chart.js 로드 시도
      loadChartJS().then(() => {
        renderCPUCharts(container);
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
    compareTypeSelect.value = '';
    compareItemsSelect.innerHTML = '<option value="">먼저 타입을 선택하세요</option>';
    compareItemsSelect.disabled = true;
    compareBtn.disabled = true;
    clearBtn.disabled = true;
    compareResults.style.display = 'none';
    selectedItems = [];
    
    charts.forEach(chart => {
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    charts = [];
  }

  // 이벤트 리스너
  console.log('이벤트 리스너 등록 중');
  compareTypeSelect.addEventListener('change', () => {
    console.log('타입 변경 이벤트 발생:', compareTypeSelect.value);
    updateItemsList();
  });
  compareItemsSelect.addEventListener('change', updateCompareButton);
  compareBtn.addEventListener('click', performCompare);
  clearBtn.addEventListener('click', clearComparison);

  // 데이터 로드
  console.log('데이터 로드 시작');
  loadData();
  console.log('비교 툴 초기화 완료');
}

