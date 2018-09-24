module.exports = function(dependency, ext) {
  return [
    `${dependency}.${ext}`,
    `${dependency}.min.${ext}`,

    `dist/${dependency}.${ext}`,
    `dist/${dependency}.min.${ext}`,
    `dist/${ext}/${dependency}.${ext}`,
    `dist/${ext}/${dependency}.min.${ext}`,

    `lib/${dependency}.${ext}`,
    `lib/${dependency}.min.${ext}`,
    `lib/${ext}/${dependency}.${ext}`,
    `lib/${ext}/${dependency}.min.${ext}`,

    `libs/${dependency}.${ext}`,
    `libs/${dependency}.min.${ext}`,
    `libs/${ext}/${dependency}.${ext}`,
    `libs/${ext}/${dependency}.min.${ext}`
  ]
};
