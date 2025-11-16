---
layout: page
icon: fas fa-balance-scale
order: 4
---

<script id="compare-data" type="application/json">
{%- assign aps_json = site.data.aps | jsonify -%}
{%- assign devices_json = site.data.devices | jsonify -%}
{
  "aps": {{ aps_json }},
  "devices": {{ devices_json }}
}
</script>

<div id="compare-tool" class="compare-tool-wrapper">
  <div class="compare-tool-header mb-4">
    <h2 class="mb-3">{{ site.data.locales[site.lang].compare.title | default: "스펙 비교" }}</h2>
    <p class="text-muted">{{ site.data.locales[site.lang].compare.description | default: "CPU나 기기를 선택하여 스펙을 비교해보세요." }}</p>
  </div>

  <div class="compare-tool-controls mb-4">
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label">
          {{ site.data.locales[site.lang].compare.category_label | default: "분류 선택" }}
        </label>
        <div class="category-columns">
          <!-- 왼쪽 컬럼: 대분류 -->
          <div class="category-column category-column-main">
            <div class="category-item category-main" data-category="ap">
              <span class="category-name">AP</span>
            </div>
            <div class="category-item category-main" data-category="device">
              <span class="category-name">디바이스</span>
            </div>
          </div>
          
          <!-- 중간 컬럼: 중분류 -->
          <div class="category-column category-column-sub" id="subcategory-column">
            <p class="category-placeholder">대분류를 선택하세요</p>
          </div>
          
          <!-- 오른쪽 컬럼: 소분류 (디바이스만) 또는 아이템 목록 -->
          <div class="category-column category-column-items" id="items-column">
            <p class="category-placeholder">중분류를 선택하세요</p>
          </div>
          
          <!-- 아이템 목록 컬럼 (소분류 하위) -->
          <div class="category-column category-column-item-list" id="item-list-column">
            <p class="category-placeholder">소분류를 선택하세요</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mt-4">
      <div class="col-12">
        <div id="selected-items-tags" class="selected-items-tags">
          <p class="text-muted mb-0">분류를 선택하여 항목을 추가하세요</p>
        </div>
      </div>
    </div>
    
    <div class="row mt-3">
      <div class="col-12">
        <button id="compare-btn" class="btn btn-primary" disabled>
          {{ site.data.locales[site.lang].compare.compare_button | default: "비교하기" }}
        </button>
        <button id="clear-btn" class="btn btn-outline-secondary ms-2" disabled>
          {{ site.data.locales[site.lang].compare.clear_button | default: "초기화" }}
        </button>
      </div>
    </div>
  </div>

  <div id="compare-results" class="compare-results" style="display: none;">
    <div class="compare-table-wrapper mb-4">
      <h3 class="mb-3">{{ site.data.locales[site.lang].compare.specs_table | default: "스펙 비교표" }}</h3>
      <div class="table-responsive">
        <table id="compare-table" class="table table-bordered table-hover">
          <thead id="compare-table-head">
          </thead>
          <tbody id="compare-table-body">
          </tbody>
        </table>
      </div>
    </div>

    <div class="compare-charts-wrapper">
      <h3 class="mb-3">{{ site.data.locales[site.lang].compare.charts | default: "스펙 차트" }}</h3>
      <div class="row g-4">
        <div id="chart-container" class="col-12">
          <!-- Charts will be rendered here -->
        </div>
      </div>
    </div>
  </div>
</div>

