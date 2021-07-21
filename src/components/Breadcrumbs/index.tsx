import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { uuid } from '../../utils/uuid'

const Breadcrumbs = () => {
  const { pathname } = useLocation()
  const [pathArr, setPathArr] = useState<string[]>([])

  const getPath = (s: string) => {
    const id = pathArr.indexOf(s)
    let path = '/'
    for (let i = 0; i <= id; i++) {
      path += `${pathArr[i]}/`
    }
    return path.toLowerCase().slice(0, -1)
  }

  useEffect(() => {
    const arr = pathname
      .split('/')
      .filter((e) => e !== '')
      .map((e) => e[0].toUpperCase() + e.substring(1))
    setPathArr(arr)
  }, [])
  return (
    <Breadcrumb>
      {pathArr.length && pathArr.map((val) => (
        <BreadcrumbItem key={uuid()}>
          <BreadcrumbLink as={Link} to={getPath(val)}>{val}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default Breadcrumbs
