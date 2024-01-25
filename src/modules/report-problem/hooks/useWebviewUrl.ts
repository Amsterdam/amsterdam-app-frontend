import {Environment} from '@/environment'
import {useSelector} from '@/hooks/redux/useSelector'
import {REPORT_PROBLEM_EXTERNAL_LINKS} from '@/modules/report-problem/constants'
import {selectEnvironment} from '@/store/slices/environment'

export const useReportProblemWebviewUrl = () => {
  const {environment} = useSelector(selectEnvironment)
  const {REPORT_PROBLEM_ACC_URL, REPORT_PROBLEM_PROD_URL} =
    REPORT_PROBLEM_EXTERNAL_LINKS

  return environment === Environment.acceptance
    ? REPORT_PROBLEM_ACC_URL
    : REPORT_PROBLEM_PROD_URL
}
