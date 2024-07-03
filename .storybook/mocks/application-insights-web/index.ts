/* eslint-disable @typescript-eslint/no-empty-function */

export class ApplicationInsights {
  readonly config = {}
  readonly appInsights = {}
  readonly core = {}
  readonly context = {}
  readonly pluginVersionStringArr = []
  readonly pluginVersionString = ''
  constructor() {}
  getCookieMgr() {}
  trackEvent() {}
  trackPageView() {}
  trackPageViewPerformance() {}
  trackException() {}
  _onerror() {}
  trackTrace() {}
  trackMetric() {}
  startTrackPage() {}
  stopTrackPage() {}
  startTrackEvent() {}
  stopTrackEvent() {}
  addTelemetryInitializer() {}
  setAuthenticatedUserContext() {}
  clearAuthenticatedUserContext() {}
  trackDependencyData() {}
  flush() {}
  onunloadFlush() {}
  loadAppInsights() {}
  updateSnippetDefinitions() {}
  emptyQueue() {}
  pollInternalLogs() {}
  stopPollingInternalLogs() {}
  addHousekeepingBeforeUnload() {}
  getSender() {}
  unload() {}
  getPlugin() {}
  addPlugin() {}
  updateCfg() {}
  evtNamespace() {}
  addUnloadCb() {}
  addDependencyListener() {}
  addDependencyInitializer() {}
  getTraceCtx() {}
  onCfgChange() {}
}

export default {
  ApplicationInsights,
}
