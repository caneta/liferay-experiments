<%@ include file="/init.jsp" %>

<div id="<portlet:namespace />Sequences"></div>

<aui:script require="sequences-explorer/js/printer.es">
	var SequencesPrinter = sequencesExplorerJsPrinterEs.default;

	var sequencesContainer = $('#<portlet:namespace />Sequences')[0];

	new SequencesPrinter(sequencesContainer).print();
</aui:script>
