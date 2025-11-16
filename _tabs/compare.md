---
layout: page
icon: fas fa-balance-scale
order: 4
---

<script id="compare-data" type="application/json">
{%- assign cpus_json = site.data.cpus | jsonify -%}
{%- assign devices_json = site.data.devices | jsonify -%}
{
  "cpus": {{ cpus_json }},
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
      <div class="col-12 col-md-4">
        <label for="compare-type" class="form-label">
          {{ site.data.locales[site.lang].compare.type_label | default: "비교 타입" }}
        </label>
        <select id="compare-type" class="form-select">
          <option value="">{{ site.data.locales[site.lang].compare.select_type | default: "타입 선택" }}</option>
          <option value="cpu">CPU</option>
          <option value="device">{{ site.data.locales[site.lang].compare.device | default: "기기" }}</option>
        </select>
      </div>
      <div class="col-12 col-md-8">
        <label for="compare-items" class="form-label">
          {{ site.data.locales[site.lang].compare.items_label | default: "비교 항목 (2개 이상 선택)" }}
        </label>
        <select id="compare-items" class="form-select" multiple size="5" disabled>
          <option value="">{{ site.data.locales[site.lang].compare.select_type_first | default: "먼저 타입을 선택하세요" }}</option>
        </select>
        <small class="form-text text-muted">
          {{ site.data.locales[site.lang].compare.multi_select_hint | default: "Ctrl/Cmd 키를 누른 채로 여러 항목을 선택할 수 있습니다." }}
        </small>
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

