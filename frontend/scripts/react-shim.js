// esbuild에서 emotion css prop을 사용하기 위한 shim
// https://github.com/evanw/esbuild/issues/832#issuecomment-951498187
import { jsx } from "@emotion/react";
import { Fragment } from "react";
export { jsx, Fragment };
