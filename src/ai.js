import { roles, scenarioLabels, getScenario, getConnection } from './ai-data.js?v=20261021-1';

const $ = selector => document.querySelector(selector);
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const translated = Array.from(document.querySelectorAll('[data-en]'), element => ({ element, hr: element.textContent, en: element.dataset.en }));
const translatedLabels = Array.from(document.querySelectorAll('[data-en-label]'), element => ({ element, hr: element.getAttribute('aria-label'), en: element.dataset.enLabel }));
let language = 'hr';
try { if (window.localStorage.getItem('ovamo-language') === 'en') language = 'en'; } catch { /* The demo works without storage. */ }
let roleId = 'owner';
let scenarioId = 'overview';
let client = 'ovamo';
let actionState = 'idle';
let delayed = false;
let previousFocus = null;
const dialog = $('#ai-approval-dialog');
const t = (hr, en) => language === 'en' ? en : hr;
const currentScenario = () => getScenario(scenarioId, roleId, language, delayed);

function renderRoles() {
  $('#ai-roles').innerHTML = roles.map(role => `<button type="button" data-role="${role.id}" aria-pressed="${role.id === roleId}">${escape(role.name[language])}</button>`).join('');
  const role = roles.find(item => item.id === roleId);
  $('#ai-role-avatar').textContent = role.name[language].charAt(0);
  $('#ai-role-name').textContent = role.name[language];
  $('#ai-role-location').textContent = role.location[language];
  $('#ai-role-description').textContent = role.description[language];
  $('#ai-questions').innerHTML = role.scenarios.map(id => `<button type="button" data-scenario="${id}" aria-pressed="${id === scenarioId}"><span>${escape(scenarioLabels[id][language])}</span><span aria-hidden="true">↗</span></button>`).join('');
}

function renderAction(action) {
  if (!action) return '';
  if (actionState === 'idle') return `<div class="ai-action-area"><button type="button" class="button button-plum" data-ai-action="draft">${t('Pripremi demo nacrt', 'Prepare a demo draft')} <span aria-hidden="true">↗</span></button></div>`;
  if (actionState === 'complete') return `<div class="ai-action-area"><div class="ai-demo-receipt" role="status"><strong>${action.canApprove ? t('Demo korak odobren.', 'Demo step approved.') : t('Demo zahtjev pripremljen za odobrenje.', 'Demo request prepared for approval.')}</strong><p>${escape(action.result)}</p><p>${t('U ovom prikazu ništa nije poslano ni knjiženo.', 'Nothing was sent or posted in this demonstration.')}</p></div><button type="button" class="ai-demo-reset" data-ai-action="reset">${t('Ponovi primjer', 'Reset this example')}</button></div>`;
  const reviewing = actionState === 'review';
  return `<div class="ai-action-area"><div class="ai-draft"><div class="ai-draft-header"><span>${escape(action.title)}</span><span>${t('DEMO NACRT', 'DEMO DRAFT')}</span></div><p>${escape(action.body)}</p><button type="button" class="button button-plum" data-ai-action="${reviewing ? 'confirm' : 'review'}">${reviewing ? t('Potvrdi demo korak', 'Confirm demo step') : action.canApprove ? t('Pregledaj i odobri demo', 'Review and approve demo') : t('Pregledaj zahtjev za odobrenje', 'Review approval request')} <span aria-hidden="true">→</span></button><small class="ai-draft-foot">${reviewing ? t('Potvrda mijenja samo ovaj lokalni primjer. Ne šalje se poruka, narudžba ni dokument.', 'Confirmation changes only this local example. No message, order or document is sent.') : action.canApprove ? t('Vlasnica u ovom primjeru može odobriti prijedlog.', 'The owner can approve the proposal in this example.') : t('Ova ogledna uloga priprema zahtjev; odluku donosi vlasnica ili druga ovlaštena osoba.', 'This sample role prepares a request; the owner or another authorised person makes the decision.')}</small></div></div>`;
}

function renderAnswer() {
  const s = currentScenario();
  $('#ai-answer').innerHTML = `<div class="ai-user-question"><p>${escape(s.question)}</p></div><div class="ai-answer-heading"><span class="ai-spark" aria-hidden="true">✳</span><div><h3>${escape(s.title)}</h3><p>${escape(s.intro)}</p></div></div><div class="ai-answer-metrics">${s.metrics.map(item => `<div class="ai-answer-metric"><span>${escape(item.label)}</span><strong>${escape(item.value)}</strong>${item.note ? `<small>${escape(item.note)}</small>` : ''}</div>`).join('')}</div><p class="ai-answer-copy">${escape(s.text)}</p>${s.rows.length ? `<div class="ai-answer-table-wrap"><table class="ai-answer-table" aria-label="${escape(s.title)}"><thead><tr>${s.columns.map(column => `<th scope="col">${escape(column)}</th>`).join('')}</tr></thead><tbody>${s.rows.map(row => `<tr>${row.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}${s.cashToggle ? `<label class="ai-cash-toggle"><input id="ai-cash-delay" type="checkbox" ${delayed ? 'checked' : ''}><span>${t('Što ako svih 3.500 € naplate kasni izvan razdoblja?', 'What if all €3,500 in collections arrive after this period?')}</span></label>` : ''}${s.notes.map(note => `<p class="ai-answer-note">${escape(note)}</p>`).join('')}${renderAction(s.action)}<p class="ai-answer-source"><strong>${t('Izvor primjera:', 'Example source:')}</strong> ${escape(s.source)}<br>${escape(s.period)}</p>`;
}

function renderConnection() {
  const connection = getConnection(client, language);
  $('#ai-client-title').textContent = connection.title;
  $('#ai-connect-steps').innerHTML = connection.steps.map(([title, body]) => `<li><strong>${escape(title)}</strong><span>${escape(body)}</span></li>`).join('');
  document.querySelectorAll('[data-client]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.client === client)));
}

function translatePage() {
  document.documentElement.lang = language;
  document.title = t('OVAMO AI — Tvoje poslovanje. Jedan razgovor.', 'OVAMO AI — Your business. One conversation.');
  translated.forEach(item => { item.element.textContent = item[language]; });
  translatedLabels.forEach(item => item.element.setAttribute('aria-label', item[language]));
  $('#ai-language').innerHTML = `${language.toUpperCase()} <span aria-hidden="true">/ ${language === 'hr' ? 'EN' : 'HR'}</span>`;
  $('#ai-language').setAttribute('aria-label', t('Switch to English', 'Prebaci na hrvatski'));
  renderRoles();
  renderAnswer();
  renderConnection();
}

function selectScenario(id) {
  const role = roles.find(item => item.id === roleId);
  if (!role.scenarios.includes(id)) return;
  scenarioId = id;
  actionState = 'idle';
  delayed = false;
  renderRoles();
  renderAnswer();
}

function closeApproval() {
  if (dialog.open) dialog.close();
  document.body.classList.remove('ai-page-dialog-open');
}

function confirmDemo() {
  if (!currentScenario().action || !['draft', 'review'].includes(actionState)) return;
  closeApproval();
  actionState = 'complete';
  renderAnswer();
  $('[data-ai-action="reset"]')?.focus({ preventScroll: true });
}

function showApproval() {
  const s = currentScenario();
  if (!s.action || actionState !== 'draft') return;
  previousFocus = document.activeElement;
  $('#approval-description').textContent = s.action.canApprove ? t('Pregledaj sadržaj koji bi ovlaštena osoba odobrila u stvarnom sustavu.', 'Review the content an authorised person would approve in production.') : t('Tvoja ogledna uloga priprema zahtjev za ovlaštenu osobu. Ovaj korak ne odobrava poslovnu radnju.', 'Your sample role prepares a request for an authorised person. This step does not approve the business action.');
  $('#ai-approval-summary').textContent = s.action.body;
  if (typeof dialog.showModal !== 'function') {
    actionState = 'review';
    renderAnswer();
    $('[data-ai-action="confirm"]')?.focus({ preventScroll: true });
    return;
  }
  dialog.showModal();
  document.body.classList.add('ai-page-dialog-open');
  $('#ai-approval-close').focus();
}

$('#ai-roles').addEventListener('click', event => {
  const button = event.target.closest('[data-role]');
  if (!button) return;
  const role = roles.find(item => item.id === button.dataset.role);
  if (!role) return;
  roleId = role.id;
  selectScenario(role.scenarios[0]);
  $(`[data-role="${roleId}"]`).focus({ preventScroll: true });
});
$('#ai-questions').addEventListener('click', event => {
  const button = event.target.closest('[data-scenario]');
  if (!button) return;
  selectScenario(button.dataset.scenario);
  $(`[data-scenario="${scenarioId}"]`).focus({ preventScroll: true });
});
$('#ai-answer').addEventListener('click', event => {
  const button = event.target.closest('[data-ai-action]');
  if (!button) return;
  if (button.dataset.aiAction === 'draft' && currentScenario().action) {
    actionState = 'draft'; renderAnswer(); $('[data-ai-action="review"]')?.focus({ preventScroll: true });
  } else if (button.dataset.aiAction === 'review') showApproval();
  else if (button.dataset.aiAction === 'confirm') confirmDemo();
  else if (button.dataset.aiAction === 'reset') { actionState = 'idle'; renderAnswer(); $('[data-ai-action="draft"]')?.focus({ preventScroll: true }); }
});
$('#ai-answer').addEventListener('change', event => {
  if (event.target.id !== 'ai-cash-delay') return;
  delayed = event.target.checked;
  renderAnswer();
  $('#ai-cash-delay')?.focus({ preventScroll: true });
});
$('#ai-clients').addEventListener('click', event => {
  const button = event.target.closest('[data-client]');
  if (!button || !['ovamo', 'claude', 'chatgpt'].includes(button.dataset.client)) return;
  client = button.dataset.client;
  renderConnection();
});
document.querySelectorAll('[data-demo-scenario]').forEach(link => link.addEventListener('click', () => {
  const allowed = roles.find(item => item.id === roleId).scenarios;
  if (!allowed.includes(link.dataset.demoScenario)) roleId = 'owner';
  selectScenario(link.dataset.demoScenario);
}));
$('#ai-language').addEventListener('click', () => {
  language = language === 'hr' ? 'en' : 'hr';
  try { window.localStorage.setItem('ovamo-language', language); } catch { /* Keep language in memory. */ }
  translatePage();
});
$('#ai-approval-close').addEventListener('click', closeApproval);
$('#ai-approval-cancel').addEventListener('click', closeApproval);
$('#ai-approval-confirm').addEventListener('click', confirmDemo);
dialog.addEventListener('close', () => {
  document.body.classList.remove('ai-page-dialog-open');
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  previousFocus = null;
});

translatePage();
