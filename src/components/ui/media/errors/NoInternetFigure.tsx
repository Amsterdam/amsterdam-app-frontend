import {Svg, SvgProps, G, Path, Mask} from 'react-native-svg'

export const NoInternetFigure = ({
  width = 154,
  height = 379,
  ...props
}: SvgProps) => (
  <Svg
    fill="none"
    height={height}
    viewBox="0 0 154 379"
    width={width}
    {...props}>
    <Path
      d="M59.037 46.545v-5.363c0-6.637 3.306-10 6.613-13.091 3.212-3 6.613-5.273 6.613-10.364 0-3.727-2.834-5.909-7.652-5.909-3.401 0-6.235 1.636-8.786 5.091L46 9.364C50.818 2.909 56.864 0 66.689 0 78.876 0 87 6 87 15.636c0 7.091-3.873 11.637-7.746 15.455-4.252 4.09-8.503 7.818-8.503 12.273v3.181H59.037ZM64.894 68c-4.912 0-8.502-3.364-8.502-8.09 0-4.637 3.684-8.092 8.502-8.092 4.818 0 8.502 3.455 8.502 8.091 0 4.727-3.59 8.091-8.502 8.091Z"
      fill="#009DE6"
    />
    <Mask
      height="294"
      id="a"
      maskType="luminance"
      maskUnits="userSpaceOnUse"
      width="154"
      x="0"
      y="85">
      <Path
        d="M0 85h153.593v294H0V85Z"
        fill="#fff"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        d="m124.157 356.409-11.764-10.167-.01-.009a11.237 11.237 0 0 0-4.073-2.694c-5.836-2.231-12.382.694-14.613 6.542l-5.015 13.126 41.397 15.794c2.872-8.022.55-17.002-5.922-22.592Z"
        fill="#131212"
      />
      <Path
        d="M93.69 350.08c2.238-5.848 8.784-8.778 14.617-6.542 5.83 2.223 8.759 8.764 6.535 14.612-2.231 5.836-8.766 8.754-14.615 6.532-5.832-2.224-8.753-8.766-6.537-14.602Z"
        fill="#121013"
      />
      <Path
        d="M131.233 273.349c1.042-10.22-6.393-19.35-16.612-20.397-10.214-1.046-19.343 6.382-20.402 16.611a33.495 33.495 0 0 0-.088 1.648l-1.174 82.772c-.073 5.794 4.296 10.785 10.157 11.385 5.869.598 11.15-3.401 12.262-9.088l15.615-81.3c.108-.529.183-1.075.242-1.631Z"
        fill="#131212"
      />
      <Path
        d="M94.224 269.563c1.043-10.229 10.183-17.658 20.405-16.611 10.211 1.047 17.65 10.176 16.612 20.397-1.06 10.23-10.189 17.66-20.405 16.611-10.219-1.047-17.651-10.17-16.612-20.397Z"
        fill="#121013"
      />
      <Path
        d="M32.309 238.84c-14.24-1.175-26.732 9.407-27.912 23.648-1.172 14.238 9.41 26.732 23.65 27.91.78.065 1.568.097 2.348.087l82.445-.427c9.541-.044 17.63-7.382 18.43-17.074.804-9.675-5.973-18.248-15.381-19.861l-81.242-13.982a31.119 31.119 0 0 0-2.338-.301Z"
        fill="#131212"
      />
      <Path
        d="M28.047 290.399c-14.242-1.179-24.823-13.672-23.646-27.91 1.183-14.242 13.67-24.823 27.907-23.647 14.236 1.182 24.822 13.673 23.647 27.91-1.183 14.24-13.68 24.823-27.908 23.647Z"
        fill="#121013"
      />
      <Path
        d="M133.866 171.311c-3.065-4.297-9.002-5.344-13.344-2.382l-50.036 33.692c-.086.057-.165.114-.252.167-5.085 3.63-6.27 10.695-2.642 15.788 3.634 5.094 10.7 6.278 15.79 2.646.09-.06.168-.119.245-.179l48.149-36.336c4.216-3.15 5.161-9.093 2.09-13.396Z"
        fill="#131212"
      />
      <Path
        d="M84.51 220.449c4.587-4.102 5.055-11.098 1.093-15.761L46.85 158.874c-.08-.089-.166-.192-.25-.286-4.753-5.333-12.925-5.788-18.263-1.027-5.322 4.752-5.788 12.927-1.029 18.257.095.095.17.185.258.283l41.164 43.666c4.195 4.458 11.196 4.78 15.778.682Z"
        fill="#131212"
      />
      <Path
        d="M23.122 176.313c-5.994-3.898-7.68-11.905-3.788-17.895 3.9-5.986 11.905-7.683 17.891-3.784 5.987 3.895 7.686 11.902 3.788 17.895-3.891 5.983-11.898 7.679-17.89 3.784Z"
        fill="#121013"
      />
      <Path
        d="M30.17 152.543c-14.278 0-25.858 11.578-25.858 25.862v86.221c0 14.282 11.58 25.86 25.858 25.86 14.292 0 25.87-11.578 25.873-25.86v-86.221c0-14.284-11.58-25.862-25.873-25.862Z"
        fill="#131212"
      />
      <Path
        d="M4.314 264.619c0-14.287 11.575-25.863 25.86-25.863 14.291 0 25.865 11.576 25.865 25.863 0 14.289-11.574 25.867-25.866 25.867-14.284 0-25.859-11.578-25.859-25.867Z"
        fill="#121013"
      />
      <Path
        d="M0 115.181c0-16.665 13.508-30.18 30.174-30.18 16.665 0 30.174 13.515 30.174 30.18s-13.509 30.174-30.174 30.174C13.508 145.355 0 131.846 0 115.181ZM4.314 178.401c0-14.278 11.575-25.862 25.86-25.862 14.291 0 25.865 11.584 25.865 25.862 0 14.292-11.574 25.872-25.866 25.872-14.284 0-25.859-11.58-25.859-25.872ZM126.24 147.94c9.495 3.217 14.704 13.41 11.743 22.992l-2.772 8.779c-.027.078-.049.165-.073.258-1.717 5.072-7.225 7.787-12.295 6.071-5.079-1.711-7.796-7.217-6.081-12.287.022-.088.049-.169.081-.249l9.397-25.564Z"
        fill="#131212"
      />
      <Path
        d="M88.682 379H4.309v-88.513h84.373V379Z"
        fill="#00ADEF"
      />
    </G>
    <Mask
      height="45"
      id="b"
      maskType="luminance"
      maskUnits="userSpaceOnUse"
      width="42"
      x="112"
      y="133">
      <Path
        d="m112.729 164.742 16.545 12.724 24.317-31.617-16.545-12.724-24.317 31.617Z"
        fill="#fff"
      />
    </Mask>
    <G mask="url(#b)">
      <Path
        d="m128.31 176.598-14.494-11.148a1.196 1.196 0 0 1-.219-1.674l22.74-29.567a1.197 1.197 0 0 1 1.674-.218l14.494 11.147c.521.401.618 1.154.218 1.674l-22.739 29.567c-.4.521-1.154.619-1.674.219Z"
        fill="#00ADEF"
      />
      <Path
        d="m128.31 176.598-14.494-11.148a1.196 1.196 0 0 1-.219-1.674l22.74-29.567a1.197 1.197 0 0 1 1.674-.218l14.494 11.147c.521.401.618 1.154.218 1.674l-22.739 29.567c-.4.521-1.154.619-1.674.219Z"
        stroke="#00ADEF"
        stroke-miterlimit="10"
        stroke-width=".132"
      />
      <Path
        d="M132.444 171.275 117.9 160.089l16.384-21.302 14.543 11.185-16.383 21.303Z"
        fill="#1D1818"
        stroke="#231F20"
        stroke-miterlimit="10"
        stroke-width=".264"
      />
      <Path
        d="M125.115 169.712a2.326 2.326 0 1 1-3.688-2.835 2.326 2.326 0 0 1 3.688 2.835Z"
        fill="#1D1818"
      />
    </G>
  </Svg>
)