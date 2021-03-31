<div <% if $Required %> data-bouncer-required-set<% end_if %>>
<ul $AttributesHTML>
	<% if $Options.Count %>
		<% loop $Options %>
			<li class="$Class">
				<input id="$ID" class="checkbox" name="$Name" type="checkbox" value="$Value.ATT"<% if $isChecked %> checked="checked"<% end_if %><% if $isDisabled %> disabled="disabled"<% end_if %> data-bouncer-target="#checkbox-error-{$Up.ID}" />
				<label for="$ID">$Title</label>
			</li>
		<% end_loop %>
	<% else %>
		<li><%t SilverStripe\\Forms\\CheckboxSetField_ss.NOOPTIONSAVAILABLE 'No options available' %></li>
	<% end_if %>
</ul>
<div id="checkbox-error-$ID"></div>
</div>