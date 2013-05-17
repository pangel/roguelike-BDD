def all_combinations(ary)
  res = []
  (ary.length+1).times { |i|
    if (i > 0)
      ary.combination(i) { |e|
        res << e
      }
    end
  }
  res
end

a =  %w(wup wrightup wright wrightdown wdown wleftdown wleft wleftup)
sp = " " * 8
all_combinations(a).each { |comb|
  lines = comb.push("Stone%20Block").map { |e|
    "url('images/#{e}.png')"
  }.join(",\n#{sp}")
  puts <<EOF
    .o.#{comb[0..-2].join('.')} {
      background-image: \n#{sp}#{lines};
    }

EOF
}
