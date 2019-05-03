module.exports = opts => !opts? '' : Object.entries(opts).reduce((acc, cur) =>`${acc} ${cur[0]}="${cur[1]}"`, "");
